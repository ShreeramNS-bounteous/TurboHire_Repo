import React, { useState } from "react";

const AdminJobFilters = ({ onApply, onReset }) => {

  const [filters, setFilters] = useState({
    jobTitleContains: "",
    jobStatus: "",
    businessUnitId: "",
    recruiterId: "",
    createdAfter: "",
    createdBefore: ""
  });

  const update = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const apply = () => {
    const cleaned = {};

    Object.keys(filters).forEach(key => {
      if (filters[key]) cleaned[key] = filters[key];
    });

    onApply(cleaned);
  };

  const reset = () => {
    setFilters({
      jobTitleContains: "",
      jobStatus: "",
      businessUnitId: "",
      recruiterId: "",
      createdAfter: "",
      createdBefore: ""
    });

    onReset();
  };

  return (
    <div className="bg-white shadow rounded p-4 space-y-3">

      <h2 className="font-semibold">Filter Jobs</h2>

      <div className="grid grid-cols-3 gap-3">

        <input
          name="jobTitleContains"
          placeholder="Job title"
          value={filters.jobTitleContains}
          onChange={update}
          className="border p-2 rounded"
        />

        <select
          name="jobStatus"
          value={filters.jobStatus}
          onChange={update}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>

        <input
          name="businessUnitId"
          placeholder="Business Unit ID"
          value={filters.businessUnitId}
          onChange={update}
          className="border p-2 rounded"
        />

        <input
          name="recruiterId"
          placeholder="Recruiter ID"
          value={filters.recruiterId}
          onChange={update}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="createdAfter"
          value={filters.createdAfter}
          onChange={update}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="createdBefore"
          value={filters.createdBefore}
          onChange={update}
          className="border p-2 rounded"
        />

      </div>

      <div className="flex gap-3">
        <button
          onClick={apply}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>

        <button
          onClick={reset}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

    </div>
  );
};

export default AdminJobFilters;