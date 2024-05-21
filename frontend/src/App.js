import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import JobsPage from "./pages/Jobs";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </>
  );
}

export default App;
