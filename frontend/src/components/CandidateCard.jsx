import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, FileText, Download } from "lucide-react";
import api from "../api/axios";
import RightDrawer from "./RightDrawer"; // 🔥 your existing drawer component
import toast from "react-hot-toast";

const CandidateCard = ({ candidate, feedbackToShow = [] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [loadingResume, setLoadingResume] = useState(false);

  const dropdownRef = useRef(null);

  /* ================= SORT FEEDBACK ================= */
  const sortedFeedback = [...feedbackToShow].sort(
    (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
  );

  const latestFeedback = sortedFeedback[0];

  const isFirstRound =
    candidate.roundName?.toLowerCase().includes("1") ||
    candidate.roundName?.toLowerCase().includes("round 1");

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOAD RESUME ================= */
  const handleViewResume = async () => {
    try {
      setLoadingResume(true);
      const res = await api.get(
        `/api/candidates/${candidate.candidateId}/resume`
      );
      setResume(res.data);
      setResumeOpen(true);
    } catch (err) {
      toast.error("Failed to load resume");
    } finally {
      setLoadingResume(false);
    }
  };

  /* ================= DOWNLOAD RESUME ================= */
  const handleDownload = () => {
    if (!resume?.resumePdf) return;

    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${resume.resumePdf}`;
    link.download = `${candidate.candidateName}_Resume.pdf`;
    link.click();
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-visible">

        {/* ================= TOP JOB BAR ================= */}
        <div className="bg-[#101828] text-white px-4 md:px-6 py-3 text-sm font-medium">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <span>
              Job Code: <b>BXA-{String(candidate.jobId).padStart(4, "0")}</b>
            </span>
            <span>
              Job Name: <b>{candidate.jobTitle}</b>
            </span>
            <span>
              Department: <b>BU</b>
            </span>
            <span>
              Location: <b>Bangalore</b>
            </span>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">

          {/* ===== LEFT SIDE ===== */}
          <div className="flex gap-5 items-center w-full lg:w-auto">
            <div className="h-16 w-16 md:h-20 md:w-20 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold">
              {(candidate.candidateName || "").charAt(0)}
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#101828]">
                {candidate.candidateName}
              </h2>

              <p className="text-gray-500 mt-1 text-sm md:text-base">
                {candidate.currentCompany}
              </p>

              <p className="text-gray-500 mt-2 text-xs md:text-sm break-all">
                {candidate.candidateEmail || ""}
              </p>

              {/* 🔥 VIEW RESUME BUTTON */}
              <button
                onClick={handleViewResume}
                disabled={loadingResume}
                className="mt-3 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                <FileText size={16} />
                {loadingResume ? "Loading..." : "View Resume"}
              </button>
            </div>
          </div>

          {/* ===== RIGHT SIDE (LATEST EVALUATION) ===== */}
          <div
            className="w-full lg:w-[380px] relative"
            ref={dropdownRef}
          >
            <div
              className="bg-[#F4EFEA] rounded-2xl p-5 md:p-6 cursor-pointer hover:shadow-md transition"
              onClick={() => {
                if (!isFirstRound && latestFeedback) {
                  setShowDropdown(!showDropdown);
                }
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm font-semibold text-gray-600 uppercase">
                  Latest Evaluation
                </span>

                {!isFirstRound && latestFeedback && (
                  showDropdown ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )
                )}
              </div>

              {isFirstRound && (
                <div className="mt-4 text-gray-500 font-medium text-sm md:text-base">
                  Not Evaluated
                </div>
              )}

              {!isFirstRound && latestFeedback && (
                <>
                  <div className="mt-4 text-3xl md:text-4xl font-bold text-blue-600">
                    {latestFeedback.rating}/5
                  </div>

                  <div className="mt-2 text-gray-700 font-medium text-sm md:text-base">
                    {latestFeedback.recommendation}
                  </div>
                </>
              )}
            </div>

            {showDropdown && latestFeedback && (
              <div className="absolute left-0 mt-3 w-full bg-white border border-gray-200 shadow-2xl rounded-xl p-5 z-50">
                <p className="text-sm font-semibold mb-3">
                  {latestFeedback.roundName}
                </p>

                <div className="space-y-2 text-sm text-gray-700 break-words">
                  <p><b>Rating:</b> {latestFeedback.rating}/5</p>
                  <p><b>Recommendation:</b> {latestFeedback.recommendation}</p>
                  <p className="whitespace-pre-line">
                    <b>Comments:</b> {latestFeedback.comments}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  Submitted: {new Date(latestFeedback.submittedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= RESUME DRAWER ================= */}
      <RightDrawer
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        title="Resume"
      >
        {resume?.resumePdf ? (
          <>
            <iframe
              title="Resume"
              className="w-full h-96 border rounded"
              src={`data:application/pdf;base64,${resume.resumePdf}`}
            />

            <button
              onClick={handleDownload}
              className="mt-4 flex items-center gap-2 bg-[#101828] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black transition"
            >
              <Download size={16} />
              Download Resume
            </button>
          </>
        ) : (
          <p>No resume uploaded</p>
        )}
      </RightDrawer>
    </>
  );
};

export default CandidateCard;
