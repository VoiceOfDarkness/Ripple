// App.js
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import JobMainLayout from "./layouts/JobMainLayaout";
import JobMain from "./components/JobMain";
import Profile from "./pages/Profile";
import JobDetails from "./components/JobDetails"; // Import the JobDetails component
import CreateGigPage from "./pages/CreateGig";
import Toast from "./components/ui/Toast";
import ProtectedRoot from "./pages/Protected";
import OrdersPage from "./pages/Order";
import ChatPage from "./pages/Chat";
import MyJobPage from "./pages/MyWork";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") {
      document.body.style.backgroundColor = "#1c1c1c";
    } else {
      document.body.style.backgroundColor = " #070707";
    }
    return () => {
      document.body.className = "";
    };
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<JobMainLayout />}>
          <Route path="/jobs" element={<JobMain />} />
          <Route element={<ProtectedRoot />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route element={<ProtectedRoot />}>
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/mywork" element={<MyJobPage />} />
          <Route element={<ProtectedRoot />}>
            <Route path="/creategig" element={<CreateGigPage />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
