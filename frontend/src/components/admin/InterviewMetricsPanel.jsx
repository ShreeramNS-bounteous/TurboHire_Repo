export default function InterviewMetricsPanel({ metrics }) {

  const safeMetrics = metrics || {
    scheduled: 0,
    completed: 0,
    noShow: 0,
    noShowRate: 0
  };

  const items = [
    { label: "Scheduled", value: safeMetrics.scheduled },
    { label: "Completed", value: safeMetrics.completed },
    { label: "No Show", value: safeMetrics.noShow },
    { label: "No Show Rate", value: `${safeMetrics.noShowRate.toFixed(1)}%` }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="font-semibold mb-4">Interview Metrics</h3>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i}
            className="bg-gray-50 p-4 rounded-xl text-center">

            <p className="text-sm text-gray-500">
              {item.label}
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}