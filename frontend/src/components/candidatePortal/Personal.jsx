import { useEffect, useState } from "react";
import { updateProfileByToken } from "../../api/candidatePortal.api";
import toast from "react-hot-toast";

export default function Personal({
  sidebarOpen,
  setSidebarOpen,
  candidate,
  token
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isFresher, setIsFresher] = useState(false);

  const [candidateProfileEntity, setCandidateProfileEntity] = useState({
    currentCompany: "",
    totalExperience: "",
    skills: [],
    education: {
      degree: "",
      college: "",
      year: ""
    }
  });

  // =========================
  // SYNC DATA FROM BACKEND
  // =========================
  useEffect(() => {
    if (candidate) {
      const experience = candidate.totalExperience ?? 0;

      setCandidateProfileEntity({
        currentCompany: candidate.currentCompany || "",
        totalExperience: experience,
        skills: candidate.skills || [],
        education: {
          degree: candidate.education?.degree || "",
          college: candidate.education?.college || "",
          year: candidate.education?.year || ""
        }
      });

      setIsFresher(experience === 0);
    }
  }, [candidate]);

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const updated = await updateProfileByToken(token, {
        totalExperience: isFresher
          ? 0
          : Number(candidateProfileEntity.totalExperience),
        skills: candidateProfileEntity.skills,
        education: candidateProfileEntity.education,
        currentCompany: isFresher
          ? ""
          : candidateProfileEntity.currentCompany
      });

      const updatedExperience = updated.totalExperience ?? 0;

      setCandidateProfileEntity({
        currentCompany: updated.currentCompany || "",
        totalExperience: updatedExperience,
        skills: updated.skills || [],
        education: {
          degree: updated.education?.degree || "",
          college: updated.education?.college || "",
          year: updated.education?.year || ""
        }
      });

      setIsFresher(updatedExperience === 0);

      setIsEditing(false);
      toast.success("Profile Updated Successfully")
    } catch (err) {
      toast.error("Update failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
    

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 right-0 w-[30rem] bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Candidate Profile
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              ✖
            </button>
          </div>

          <p className="font-bold text-xl">{candidate?.fullName}</p>
          <p className="text-sm text-slate-500">{candidate?.email}</p>
          <p className="text-sm text-slate-500">{candidate?.phone}</p>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* EXPERIENCE */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">
              Experience
            </label>

            {isEditing ? (
              <div className="mt-2 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isFresher}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setIsFresher(checked);
                      setCandidateProfileEntity({
                        ...candidateProfileEntity,
                        totalExperience: checked ? 0 : ""
                      });
                    }}
                  />
                  <span className="text-sm">Fresher</span>
                </div>

                {!isFresher && (
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={candidateProfileEntity.totalExperience}
                    onChange={(e) =>
                      setCandidateProfileEntity({
                        ...candidateProfileEntity,
                        totalExperience: e.target.value
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                )}
              </div>
            ) : (
              <p className="font-semibold">
                {isFresher
                  ? "Fresher"
                  : `${candidateProfileEntity.totalExperience} Years`}
              </p>
            )}
          </div>

          {/* CURRENT COMPANY */}
          {!isFresher && (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">
                Current Company
              </label>

              {isEditing ? (
                <input
                  type="text"
                  value={candidateProfileEntity.currentCompany}
                  onChange={(e) =>
                    setCandidateProfileEntity({
                      ...candidateProfileEntity,
                      currentCompany: e.target.value
                    })
                  }
                  className="mt-2 w-full border p-2 rounded"
                />
              ) : (
                <p className="font-semibold">
                  {candidateProfileEntity.currentCompany || "Not Added"}
                </p>
              )}
            </div>
          )}

          {/* SKILLS */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">
              Skills
            </label>

            {isEditing ? (
              <input
                type="text"
                value={candidateProfileEntity.skills.join(", ")}
                onChange={(e) =>
                  setCandidateProfileEntity({
                    ...candidateProfileEntity,
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                  })
                }
                className="mt-2 w-full border p-2 rounded"
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {candidateProfileEntity.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* EDUCATION */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">
              Education
            </label>

            {isEditing ? (
              <div className="space-y-3 mt-2">
                <input
                  type="text"
                  placeholder="Degree"
                  value={candidateProfileEntity.education.degree}
                  onChange={(e) =>
                    setCandidateProfileEntity({
                      ...candidateProfileEntity,
                      education: {
                        ...candidateProfileEntity.education,
                        degree: e.target.value
                      }
                    })
                  }
                  className="w-full border p-2 rounded"
                />

                <input
                  type="text"
                  placeholder="College"
                  value={candidateProfileEntity.education.college}
                  onChange={(e) =>
                    setCandidateProfileEntity({
                      ...candidateProfileEntity,
                      education: {
                        ...candidateProfileEntity.education,
                        college: e.target.value
                      }
                    })
                  }
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Year of Graduation"
                  value={candidateProfileEntity.education.year}
                  onChange={(e) =>
                    setCandidateProfileEntity({
                      ...candidateProfileEntity,
                      education: {
                        ...candidateProfileEntity.education,
                        year: e.target.value
                      }
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ) : (
              <div className="mt-2">
                <p className="font-semibold">
                  {candidateProfileEntity.education.degree || "Not Added"}
                </p>
                <p className="text-sm text-slate-500">
                  {candidateProfileEntity.education.college}
                </p>
                <p className="text-sm text-slate-400">
                  {candidateProfileEntity.education.year}
                </p>
              </div>
            )}
          </div>

          {/* SAVE BUTTON */}
          <button
            disabled={isSaving}
            onClick={() => {
              if (isEditing) handleSaveProfile();
              else setIsEditing(true);
            }}
            className={`w-full py-3 rounded font-bold transition ${
              isEditing
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 text-white"
            } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSaving
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Edit Profile"}
          </button>

          {/* RESUME PREVIEW */}
          {candidate?.resumePdf && (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">
                Resume Preview
              </label>
              <div className="mt-3 border rounded overflow-hidden h-[400px]">
                <iframe
                  title="Resume"
                  src={`data:application/pdf;base64,${candidate.resumePdf}`}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}