export default function KPISection({
    totalActiveJobs,
    totalPipeline,
    totalHired,
    totalRejected
  }) {
  
    const cards = [
      { label: "Active Jobs", value: totalActiveJobs },
      { label: "In Pipeline", value: totalPipeline },
      { label: "Hired", value: totalHired },
      { label: "Rejected", value: totalRejected }
    ];
  
    return (
      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-sm">{card.label}</p>
            <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
          </div>
        ))}
      </div>
    );
  }