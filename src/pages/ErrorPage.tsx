import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@polyutils/components";

export default function ErrorPage({ message }: { message: string }) {
  const { logout } = useAuth0();
  return (
    <div className="error-page">
      <h2 style={{ color: "#d32f2f" }}>Login Error</h2>
      <p style={{ margin: "20px 0" }}>{message}</p>
      <Button
      shape="square"
        appearance="primary"
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      >
        Go back to login
      </Button>
    </div>
  );
}
