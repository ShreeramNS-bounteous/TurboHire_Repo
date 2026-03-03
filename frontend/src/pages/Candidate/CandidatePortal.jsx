import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPortalByToken } from "../../api/candidatePortal.api";
import Personal from "../../components/candidatePortal/Personal";
import Interviews from "../../components/candidatePortal/Interviews";

export default function CandidatePortal() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [portalData, setPortalData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("INVALID_TOKEN");
      setLoading(false);
      return;
    }
    fetchPortal();
  }, [token]);

  const fetchPortal = async () => {
    try {
      const data = await getPortalByToken(token);
      console.log(data);
      setPortalData(data);
    } catch (err) {
      setError(err?.response?.data?.error || "UNKNOWN_ERROR");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Portal Access Error
          </h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-slate-900 flex flex-col">
      {/* ================= PROFILE BAR ================= */}
      <div className="h-16 bg-[#101828] text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* LEFT - LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center relative overflow-hidden shadow-md shadow-gray-700">
              <div className="absolute inset-0 bg-gray-900"></div>
              <span className="relative z-10 text-[#008AFF] font-bold text-xl mr-[1px]">
                T
              </span>
              <span className="relative z-10 text-white font-bold text-xl">
                H
              </span>
            </div>

            <span className="font-bold tracking-tight text-lg hidden sm:block">
              TurboHire
            </span>
          </div>

          {/* RIGHT - PROFILE */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-xl transition-all"
            onClick={() => setSidebarOpen(true)}
          >
            <div className="w-9 h-9 rounded-xl bg-[#007bff] flex items-center justify-center font-bold text-white text-sm shadow-md">
              {portalData.candidate?.fullName?.charAt(0) || "U"}
            </div>

            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold leading-none">
                {portalData.candidate?.fullName}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Candidate</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN SCROLL AREA ================= */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* ================= JOB CARD ================= */}
          <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 border">
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {portalData.jobTitle}
                </h2>
                <p className="text-slate-500 mt-1 text-sm sm:text-base">
                  {portalData.businessUnit}
                </p>
              </div>

              <span
                className={`self-start sm:self-auto px-3 py-1 text-xs font-bold rounded-full border
    ${
      portalData.stage === "REJECTED"
        ? "bg-red-100 text-red-700 border-red-300"
        : "bg-emerald-100 text-emerald-700 border-emerald-300"
    }`}
              >
                {portalData.stage}
              </span>
            </div>

            {/* Bottom Stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">
                  Application Status
                </p>
                <p className="text-lg sm:text-xl font-bold text-slate-800">
                  {portalData.status?.replaceAll("_", " ")}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">
                  Total Interviews
                </p>
                <p className="text-lg sm:text-xl font-bold text-slate-800">
                  {portalData.interviews?.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* ================= INTERVIEW SECTION ================= */}
          <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 border">
            <Interviews interviewsData={portalData.interviews} />
          </div>
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <Personal
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        candidate={portalData.candidate}
        token={token}
      />
    </div>
  );
}
