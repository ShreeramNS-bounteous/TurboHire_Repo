import { useEffect, useState } from "react";
import api from "../../api/axios";
import RightDrawer from "../../components/RightDrawer";
import CandidateRow from "./CandidateRow";
import CandidateProfileDrawer from "./CandidateProfileDrawer";
import AddNewCandidate from "../recruiter/AddNewCandidate";

const PAGE_SIZE = 5;

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [page, setPage] = useState(1);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [resume, setResume] = useState(null);
  const [loadingDrawer, setLoadingDrawer] = useState(false);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);

  useEffect(() => {
    api.get("/api/candidates").then((res) => {
      setCandidates(res.data || []);
    });
  }, []);

  const paginated = candidates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Load profile summaries for visible rows
  useEffect(() => {
    paginated.forEach((c) => {
      if (!profiles[c.id]) {
        api.get(`/api/candidates/${c.id}/profile`).then((res) => {
          setProfiles((prev) => ({
            ...prev,
            [c.id]: res.data,
          }));
        });
      }
    });
  }, [paginated]);

  const openProfile = async (candidate) => {
    setDrawerOpen(true);
    setSelectedCandidate(candidate);
    setLoadingDrawer(true);
    setSelectedProfile(null);
    setResume(null);

    try {
      const [profileRes, resumeRes] = await Promise.all([
        api.get(`/api/candidates/${candidate.id}/profile`),
        api.get(`/api/candidates/${candidate.id}/resume`),
      ]);

      setSelectedProfile(profileRes.data);
      setResume(resumeRes.data);
    } finally {
      setLoadingDrawer(false);
    }
  };

  const totalPages = Math.ceil(candidates.length / PAGE_SIZE);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Candidates</h1>

        <button
          onClick={() => setCreateDrawerOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          + Add Candidate
        </button>
      </div>

      <div className="space-y-4">
        {paginated.map((c) => (
          <CandidateRow
            key={c.id}
            candidate={c}
            profile={profiles[c.id]}
            onClick={() => openProfile(c)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg border 
               hover:bg-gray-50 transition
               disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">Page</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full font-semibold">
            {page}
          </span>
          <span>of</span>
          <span className="font-semibold">{totalPages}</span>
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg border 
               hover:bg-gray-50 transition
               disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      <RightDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Candidate Profile"
      >
        <CandidateProfileDrawer
          loading={loadingDrawer}
          candidate={selectedCandidate}
          profile={selectedProfile}
          resume={resume}
        />
      </RightDrawer>
      <RightDrawer
        open={createDrawerOpen}
        onClose={() => setCreateDrawerOpen(false)}
        title="Create Candidate"
      >
        <AddNewCandidate
          onCreated={() => {
            setCreateDrawerOpen(false);

            // Refresh list
            api.get("/api/candidates").then((res) => {
              setCandidates(res.data || []);
            });
          }}
        />
      </RightDrawer>
    </div>
  );
}
