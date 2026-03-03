import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import SetNewPassword from "./pages/SetNewPassword";

import ProtectedRoute from "./auth/ProtectedRoute";

import RecruiterLayout from "./layout/RecruiterLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminUsers from "./components/admin/AdminUsers";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import BusinessUnits from "./pages/recruiter/BusinessUnits";
import JobsDashboard from "./pages/recruiter/jobs/JobsDashboard";
import CreateJob from "./pages/recruiter/CreateJob";
import Pipeline from "./pages/recruiter/Pipeline";
import AddNewCandidate from "./pages/recruiter/AddNewCandidate";
import Candidates from "./pages/recruiter/Candidates";

import InterviewDashboard from "./pages/recruiter/Interview/InterviewDashboard";
import InterviewerDashboard from "./pages/Interviewer/InterviewerDashboard";
import InterviewDetailPage from "./pages/Interviewer/InterviewerDetailPage";

import CandidatePortal from "./pages/Candidate/CandidatePortal";

import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route index element={<LandingPage />} />

        <Route
          path="/set-new-password"
          element={
            <ProtectedRoute>
              <SetNewPassword />
            </ProtectedRoute>
          }
        />

        {/* RECRUITER */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute roles={["ADMIN", "RECRUITER"]}>
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<RecruiterDashboard />} />
          <Route path="business-units" element={<BusinessUnits />} />
          <Route path="jobs" element={<JobsDashboard />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="pipeline/:jobId/add-new" element={<AddNewCandidate />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="interviews" element={<InterviewDashboard />} />
          <Route path="interviews/:jobId" element={<InterviewDashboard />} />
        </Route>

        {/* INTERVIEWER */}
        <Route
          path="/interviewer"
          element={
            <ProtectedRoute roles={["USER"]}>
              <InterviewerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interviewer/interview/:id"
          element={
            <ProtectedRoute roles={["USER"]}>
              <InterviewDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          {/* ✅ ADD THIS */}
          <Route path="users" element={<AdminUsers />} />
        </Route>
        {/* CANDIDATE PORTAL */}
        <Route path="/candidate-portal" element={<CandidatePortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
