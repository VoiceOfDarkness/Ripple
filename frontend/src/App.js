// App.js
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import JobMainLayout from "./layouts/JobMainLayaout";
import JobMain from "./components/JobMain";
import Profile from "./pages/Profile";
import JobDetails from "./components/JobDetails"; // Import the JobDetails component

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<JobMainLayout />}>
        <Route path="/jobs" element={<JobMain />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/:id" element={<JobDetails />} /> {/* Add the job details route */}
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
