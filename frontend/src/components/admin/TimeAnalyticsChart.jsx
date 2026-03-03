import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function TimeAnalyticsChart({ analytics }) {

  if (!analytics) {
    return null;
  }

  const { candidatesPerMonth, interviewsPerMonth, hiresPerMonth } = analytics;

  // Merge all months
  const monthSet = new Set();

  candidatesPerMonth.forEach(d => monthSet.add(d.month));
  interviewsPerMonth.forEach(d => monthSet.add(d.month));
  hiresPerMonth.forEach(d => monthSet.add(d.month));

  const allMonths = Array.from(monthSet).sort();

  const mergedData = allMonths.map(month => {
    const candidate =
      candidatesPerMonth.find(d => d.month === month)?.count || 0;

    const interview =
      interviewsPerMonth.find(d => d.month === month)?.count || 0;

    const hire =
      hiresPerMonth.find(d => d.month === month)?.count || 0;

    return {
      month,
      candidates: candidate,
      interviews: interview,
      hires: hire
    };
  });

  if (mergedData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border">
        No trend data available
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">
      <h3 className="text-lg font-semibold mb-6">
        Hiring Trends
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={mergedData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="candidates"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="interviews"
            fill="#f59e0b"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="hires"
            fill="#10b981"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}