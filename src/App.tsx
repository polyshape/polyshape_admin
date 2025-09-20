import { Routes, Route, Navigate } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CallbackPage from "./pages/Callback";
import Home from "./pages/Home";
import AutoLogout from "./components/AutoLogout";
import NotFoundPage from "./pages/NotFound";
import { ThemeProvider, LoadingProvider, LoadingOverlay } from "@polyutils/components";
import { GlobalLoadingProvider } from "./contexts/GlobalLoadingContext";

const ProtectedHome = withAuthenticationRequired(Home, {
  onRedirecting: () => <p>Checking authentication...</p>,
});

function App() {
  return (
    <LoadingProvider>
      <GlobalLoadingProvider>
        <ThemeProvider initialTheme="dark">
          <LoadingOverlay />
          <AutoLogout />
          <Routes>
            <Route path="/" element={<Navigate to="/publications" replace />} />
            <Route path="/publications" element={<ProtectedHome />} />
            <Route path="/projects" element={<ProtectedHome />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </GlobalLoadingProvider>
    </LoadingProvider>
  );
}

export default App;

