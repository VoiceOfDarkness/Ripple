import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import JobMainLayout from "./layouts/JobMainLayaout";
import JobMain from "./components/JobMain";
import CreateGigPage from "./pages/CreateGig";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<JobMainLayout />}>
        <Route path="/jobs" element={<JobMain />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/user/creategig" element={<CreateGigPage />} />
    </Routes>
  );
}

export default App;