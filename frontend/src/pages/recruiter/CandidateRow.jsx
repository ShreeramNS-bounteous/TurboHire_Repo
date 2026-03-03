export default function CandidateRow({ candidate, profile, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 p-6
                 transition-all duration-300 ease-out
                 hover:shadow-xl hover:-translate-y-1
                 cursor-pointer"
    >
      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 
                        text-white flex items-center justify-center 
                        text-lg font-semibold shrink-0 shadow-md">
          {candidate.fullName?.[0]}
        </div>

        {/* Name + Email */}
        <div className="min-w-0">
          <p className="font-semibold text-base sm:text-lg text-gray-900 truncate">
            {candidate.fullName}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {candidate.email}
          </p>
        </div>
      </div>

      {/* SUMMARY SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <SummaryCard title="Education">
          {profile?.education
            ? `${profile.education.degree} · ${profile.education.college}`
            : "Not Available"}
        </SummaryCard>

        <SummaryCard title="Experience">
          {profile?.totalExperience
            ? `${profile.totalExperience} years`
            : "Fresher"}
        </SummaryCard>

        <SummaryCard title="Skills">
          {profile?.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            "Not Added"
          )}
        </SummaryCard>
      </div>
    </div>
  );
}

function SummaryCard({ title, children }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
        {title}
      </p>
      <div className="text-sm text-gray-700 mt-2">
        {children}
      </div>
    </div>
  );
}