import { useEffect, useState } from "react";

export default function Interviews({ interviewsData }) {

  const safeData = Array.isArray(interviewsData) ? interviewsData : [];

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update every second for countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "Pending", time: "TBD" };

    const dateObj = new Date(isoString);

    return {
      date: dateObj.toLocaleDateString(),
      time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getJoinState = (scheduledAt) => {
    if (!scheduledAt) return { enabled: false, label: "Not Scheduled" };

    const interviewTime = new Date(scheduledAt);
    const fiveMinBefore = new Date(interviewTime.getTime() - 5 * 60 * 1000);
    const twoHoursAfter = new Date(interviewTime.getTime() + 2 * 60 * 60 * 1000);

    if (currentTime < fiveMinBefore) {
      return { enabled: false, label: "JOIN" };
    }

    if (currentTime >= fiveMinBefore && currentTime <= twoHoursAfter) {
      return { enabled: true, label: "Join Interview" };
    }

    return { enabled: false, label: "Expired" };
  };

  const getCountdown = (scheduledAt) => {
    if (!scheduledAt) return null;

    const interviewTime = new Date(scheduledAt);
    const diff = interviewTime - currentTime;

    if (diff <= 0) return null;

    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pb-20">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-6 mt-4">
          <h2 className="text-xl font-bold text-slate-800">
            Interview History
          </h2>
        </div>

        <div className="space-y-4">

          {safeData.length === 0 && (
            <div className="text-center text-slate-500 py-10">
              No interviews scheduled yet.
            </div>
          )}

          {safeData.map((item) => {

            const isCompleted = item.status === "COMPLETED";
            const { date, time } = formatDateTime(item.scheduledAt);
            const joinState = getJoinState(item.scheduledAt);
            const countdown = getCountdown(item.scheduledAt);

            return (
              <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all duration-300
                flex flex-col md:flex-row md:items-center justify-between gap-6
                ${
                  isCompleted
                    ? "bg-slate-50 border-slate-200"
                    : "bg-white border-slate-200 hover:shadow-md"
                }`}
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-5 w-full md:w-1/2">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl
                    ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-700"
                    }`}
                >
                  {isCompleted ? "✓" : item.roundName?.charAt(0) || "I"}
                </div>
            
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      isCompleted ? "text-slate-500" : "text-slate-900"
                    }`}
                  >
                    {item.roundName || "Interview Round"}
                  </h3>
            
                  <p className="text-xs uppercase tracking-wide text-slate-400 mt-1">
                    {item.mode || "ONLINE"}
                  </p>
                </div>
              </div>
            
              {/* RIGHT SIDE */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full md:w-auto md:justify-end">
            
                {/* STATUS BLOCK */}
                <div className="flex flex-col items-center min-w-[110px]">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase mb-2 tracking-wider">
                    Status
                  </span>
            
                  <span
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full border
                      ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                  >
                    {item.status.replace(/_+/g, " ").trim()}
                  </span>
                </div>
            
                {/* SCHEDULE BLOCK */}
                <div className="flex flex-col items-center min-w-[130px]">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase mb-2 tracking-wider">
                    Schedule
                  </span>
            
                  <p className="text-sm font-semibold text-slate-900">
                    {time}
                  </p>
            
                  <p className="text-xs text-slate-400">
                    {date}
                  </p>
            
                  {countdown && (
                    <p className="text-xs text-rose-500 font-medium mt-1">
                      Starts in {countdown}
                    </p>
                  )}
                </div>
            
                {/* JOIN BUTTON */}
                {!isCompleted && item.meetingUrl && (
                  <div className="flex items-center justify-center min-w-[140px]">
                    <a
                      href={joinState.enabled ? item.meetingUrl : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!joinState.enabled) e.preventDefault();
                      }}
                      className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all
                        ${
                          joinState.enabled
                            ? "bg-[#101828] text-white hover:bg-black shadow-sm"
                            : "bg-slate-200 text-slate-500 cursor-not-allowed"
                        }`}
                    >
                      {joinState.label === "Expired"
                        ? "Session Closed"
                        : joinState.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}