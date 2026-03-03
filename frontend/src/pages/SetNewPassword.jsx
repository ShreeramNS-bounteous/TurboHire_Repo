import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function SetNewPassword() {

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  // 🔐 RULES
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[@#$%&!^*]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  // 🔥 Strength Calculation
  const calculateStrength = () => {
    const score = Object.values(passwordRules).filter(Boolean).length;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (score === 3 || score === 4)
      return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-600", width: "100%" };
  };

  const strength = calculateStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Password does not meet required criteria.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      await api.put("/api/auth/set-new-password", {
        newPassword: password
      });

      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "RECRUITER") navigate("/recruiter/jobs");
      else navigate("/interviewer");

    } catch (err) {
      if (err.response?.data?.message === "NEW_PASSWORD_CANNOT_BE_OLD") {
        setError("New password cannot be same as old password.");
      } else {
        setError("Failed to update password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#101828]">
      <div className="bg-white p-10 rounded-2xl w-96 shadow-2xl">

        <h2 className="text-2xl font-bold mb-6 text-[#101828]">
          Set New Password
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PASSWORD FIELD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* 🔥 STRENGTH BAR */}
          <div className="mt-3">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all`}
                style={{ width: strength.width }}
              ></div>
            </div>
            <p className="text-xs mt-1 font-semibold">
              Strength: {strength.label}
            </p>
          </div>

          {/* RULE CHECKLIST */}
          <div className="text-xs space-y-1 mt-3">
            <Rule text="At least 8 characters" valid={passwordRules.length} />
            <Rule text="One uppercase letter" valid={passwordRules.uppercase} />
            <Rule text="One lowercase letter" valid={passwordRules.lowercase} />
            <Rule text="One digit" valid={passwordRules.digit} />
            <Rule text="One special character" valid={passwordRules.special} />
          </div>

          <button
            type="submit"
            disabled={!isPasswordValid || isSubmitting}
            className={`w-full py-3 rounded-xl font-bold transition-all mt-4
              ${isPasswordValid
                ? "bg-[#101828] text-white hover:bg-black"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>
    </div>
  );
}

function Rule({ text, valid }) {
  return (
    <p className={`flex items-center gap-2 ${valid ? "text-green-600" : "text-gray-400"}`}>
      <span>{valid ? "✔" : "•"}</span>
      {text}
    </p>
  );
}