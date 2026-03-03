import React from "react";

const Card = ({ label, value }) => (
  <div className="bg-white shadow rounded p-4">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const AdminSummaryCards = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card label="Total Jobs" value={data.totalJobs} />
      <Card label="Active Jobs" value={data.activeJobs} />
      <Card label="Candidates" value={data.totalCandidatesInPipeline} />
      <Card label="Hired" value={data.totalCandidatesHired} />
      <Card label="Rejected" value={data.totalCandidatesRejected} />
      <Card label="Interviews Scheduled" value={data.totalInterviewsScheduled} />
      <Card label="Interviews Completed" value={data.totalInterviewsCompleted} />
    </div>
  );
};

export default AdminSummaryCards;