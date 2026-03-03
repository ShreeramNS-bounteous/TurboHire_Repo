export default function RecruiterDashboard() {
  const [openJobsCount, setOpenJobsCount] = useState(0);

  useEffect(() => {
    const loadOpenJobs = async () => {
      try {
        const jobs = await getJobs();
        const openJobs = jobs.filter(
          (job) => job.status === "OPEN"
        ).length;
        setOpenJobsCount(openJobs);
      } catch (err) {
        console.error("Failed to load jobs", err);
      }
    };
    loadOpenJobs();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Open Jobs</p>
          <p className="text-3xl font-bold mt-2">
            {openJobsCount}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Active Candidates</p>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Interviews Today</p>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>
      </div>
    </div>
  );
}