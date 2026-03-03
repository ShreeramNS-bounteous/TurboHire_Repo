import { useState } from "react";

export default function CreateUserModal({
  roles,
  businessUnits,
  onClose,
  onSubmit
}) {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    roleName: "",
    businessUnitId: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  const isRecruiter = form.roleName === "RECRUITER";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

      <div className="bg-white w-96 p-6 rounded-2xl shadow-xl space-y-4">

        <h2 className="text-xl font-semibold">Create User</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />

        <select
          name="roleName"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        >
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        <select
          name="businessUnitId"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        >
          <option value="">Select Business Unit</option>
          {businessUnits.map(bu => (
            <option key={bu.id} value={bu.id}>
              {bu.name}
            </option>
          ))}
        </select>

        {/* 🔥 AUTO HIDE PASSWORD FOR RECRUITER */}
        {!isRecruiter && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
}