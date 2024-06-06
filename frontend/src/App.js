import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import JobMainLayout from "./layouts/JobMainLayaout";
import JobMain from "./components/JobMain";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<JobMainLayout />}>
        <Route path="/jobs" element={<JobMain />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
