import React from "react";

const AdminJobTable = ({ jobs }) => {

  if (!jobs || jobs.length === 0)
    return <div className="bg-white p-4 rounded shadow">No jobs found</div>;

  return (
    <div className="bg-white shadow rounded">

      <h2 className="p-4 font-semibold">Job Analytics</h2>

      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Job</th>
            <th>Total</th>
            <th>Hired</th>
            <th>Rejected</th>
            <th>Active</th>
            <th>Interviews</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map(job => (
            <tr key={job.jobId} className="border-t text-center">
              <td className="p-2">{job.jobTitle}</td>
              <td>{job.totalCandidates}</td>
              <td>{job.hiredCandidates}</td>
              <td>{job.rejectedCandidates}</td>
              <td>{job.activeCandidates}</td>
              <td>{job.interviewsConducted}</td>
              <td>{job.jobStatus}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default AdminJobTable;