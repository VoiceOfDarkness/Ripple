import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import JobsPage from "./pages/Jobs";
import AuthPage from "./pages/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
