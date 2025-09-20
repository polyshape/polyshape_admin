
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";


export default function CallbackPage() {
  const { handleRedirectCallback, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const err = params.get("error");
      const errDesc = params.get("error_description");

      // If the callback doesn't include expected params, don't attempt to handle it.
      if (!code || !state) {
        if (err || errDesc) {
          setError(errDesc || err || "Login failed.");
          return;
        }
        // If user is already authenticated, go home; otherwise send to login.
        navigate("/", { replace: true });
        return;
      }

      try {
        await handleRedirectCallback();
        navigate("/", { replace: true }); // redirect home after login
      } catch (e) {
        setError(e instanceof Error ? e.message : "Login failed.");
      }
    })();
  }, [handleRedirectCallback, isAuthenticated, navigate]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  return <p>Logging you in...</p>;
}
