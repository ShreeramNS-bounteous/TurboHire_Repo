import { useEffect, useState } from "react";
import { getJobs } from "../../../api/jobs.api";
import api from "../../../api/axios";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";

export default function JobsDashboard() {
  const [jobs, setJobs] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [pipelineByJob, setPipelineByJob] = useState({});
  const [roundsByJob, setRoundsByJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);

    // 🔥 FILTER DELETED JOBS HERE
    const jobsRes = (await getJobs()).filter((job) => job.status !== "DELETED");

    const candidatesRes = await api.get("/api/candidates");

    setJobs(jobsRes);
    setAllCandidates(candidatesRes.data || []);

    const pipelineMap = {};
    const roundsMap = {};

    await Promise.all(
      jobsRes.map(async (job) => {
        const [pipelineRes, roundsRes] = await Promise.all([
          api.get(`/api/pipeline/job/${job.id}`),
          api.get(`/api/jobs/${job.id}/rounds`),
        ]);

        pipelineMap[job.id] = pipelineRes.data || [];
        roundsMap[job.id] = roundsRes.data || [];
      })
    );

    setPipelineByJob(pipelineMap);
    setRoundsByJob(roundsMap);
    setLoading(false);
  };

  // 🔥 UI REMOVAL AFTER DELETE
  const handleJobDeleted = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));

    setPipelineByJob((prev) => {
      const copy = { ...prev };
      delete copy[jobId];
      return copy;
    });

    setRoundsByJob((prev) => {
      const copy = { ...prev };
      delete copy[jobId];
      return copy;
    });
  };

  const handleJobClosed = (jobId) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, status: "CLOSED" } : job))
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase();
  
    const generatedCode = `BXA-${String(job.id).padStart(4, "0")}`.toLowerCase();
  
    return (
      job.title?.toLowerCase().includes(query) ||
      generatedCode.includes(query)
    );
  });

  if (loading) {
    return <div className="p-6 text-gray-500">Loading jobs…</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Jobs</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search by Job Code or Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => navigate("/recruiter/jobs/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Job
          </button>
        </div>
      </div>

      {filteredJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          allCandidates={allCandidates}
          pipeline={pipelineByJob[job.id] || []}
          rounds={roundsByJob[job.id] || []}
          onJobDeleted={handleJobDeleted}
          onJobClosed={handleJobClosed}
        />
      ))}

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-lg p-6 text-gray-500 text-center">
          No matching jobs found.
        </div>
      )}
    </div>
  );
}
