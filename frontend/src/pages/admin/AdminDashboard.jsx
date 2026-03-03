import { useEffect, useState } from "react";
import axios from "axios";

import KPISection from "../../components/admin/KPISection";
import HiringFunnelChart from "../../components/admin/HiringFunnelChart";
import InterviewMetricsPanel from "../../components/admin/InterviewMetricsPanel";
import TimeAnalyticsChart from "../../components/admin/TimeAnalyticsChart";

import { getAdminDashboard } from "../../api/adminAnalyticsService";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    getAdminDashboard()
      .then((data) => {
        console.log("DASHBOARD:", data);
        setDashboard(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!dashboard) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-8 p-6">
      <KPISection
        totalActiveJobs={dashboard.totalActiveJobs}
        totalPipeline={dashboard.totalPipeline}
        totalHired={dashboard.totalHired}
        totalRejected={dashboard.totalRejected}
      />

      <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-indigo-700">
          Hiring Efficiency
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-gray-500 text-sm">Overall Conversion</p>
            <p className="text-2xl font-bold text-indigo-600">
              {dashboard.overallConversionRate}%
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Shortlisted → Hired</p>
            <p className="text-2xl font-bold text-indigo-600">
              {dashboard.totalHired} / {dashboard.totalShortlisted}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Interviews per Hire</p>
            <p className="text-2xl font-bold text-indigo-600">
              {dashboard.interviewsPerHire}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <HiringFunnelChart funnel={dashboard.funnel} />
        <InterviewMetricsPanel metrics={dashboard.interviewMetrics} />
      </div>

      {/* ✅ Add this below funnel section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-200 mt-4">
        <p className="text-sm font-semibold text-yellow-700">
          ⏳ R1 Pending Scheduling: {dashboard.r1Pending}
        </p>
      </div>

      <TimeAnalyticsChart analytics={dashboard.timeAnalytics} />
    </div>
  );
}
