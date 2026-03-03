import { useEffect, useState } from "react";
import { getJobs, publishJob, closeJob } from "../../api/jobs.api";
import { getBusinessUnits } from "../../api/businessUnits.api";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const [jobData, buData] = await Promise.all([
        getJobs(),
        getBusinessUnits(),
      ]);

      setJobs(jobData);
      setBusinessUnits(buData);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getBuName = (job) => {
    const buId = job.buId || job.bu_id;
    const bu = businessUnits.find((b) => b.id === buId);
    return bu ? bu.name : "-";
  };

  const handlePublish = async (jobId) => {
    await publishJob(jobId);
    loadData();
  };

  const handleClose = async (jobId) => {
    await closeJob(jobId);
    loadData();
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase();

    return (
      job.title?.toLowerCase().includes(query) ||
      job.jobCode?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
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

      {/* Table Wrapper */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Business Unit</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id} className="border-b">
                <td className="p-4 font-medium">{job.title}</td>
                <td className="p-4">{getBuName(job)}</td>
                <td className="p-4">{job.location}</td>
                <td className="p-4 font-semibold">{job.status}</td>
                <td className="p-4 text-right space-x-3">
                  {job.status === "DRAFT" && (
                    <button
                      onClick={() => handlePublish(job.id)}
                      className="text-green-600 font-medium"
                    >
                      Publish
                    </button>
                  )}
                  {job.status === "OPEN" && (
                    <button
                      onClick={() => handleClose(job.id)}
                      className="text-red-600 font-medium"
                    >
                      Close
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
