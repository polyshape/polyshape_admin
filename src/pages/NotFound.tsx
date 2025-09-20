import { Button } from "@polyutils/components";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page" style={{ textAlign: "center", gap: 12 }}>
      <div style={{ marginBottom: 10 }} aria-hidden="true">
        <i
          className="fa-solid fa-triangle-exclamation"
          style={{ color: "var(--main-orange)", fontSize: 40 }}
        />
      </div>
      <h1 style={{ margin: "8px 0 6px", fontSize: "2.2rem" }}>Page not found</h1>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: "1.05rem" }}>
        The page you're looking for doesn't exist.
      </p>

      <div style={{ marginTop: 18 }}>
        <Button
          appearance="outline"
          onClick={() => navigate("/", { replace: true })}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            <span>Go back home</span>
          </span>
        </Button>
      </div>
    </div>
  );
}

