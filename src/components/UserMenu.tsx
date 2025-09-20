import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@polyutils/components";

export default function UserMenu() {
  const { user, logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && ref.current.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div className="user-menu" ref={ref}>
      <Button
        className="user-avatar-btn"
        appearance="transparent"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        title={user.name || user.email || "Account"}>
        {user.picture ? (
          <img src={user.picture} alt="User avatar" className="user-avatar-img" />
        ) : (
          <span className="user-avatar-fallback" aria-hidden>
            {(user.name || "?").slice(0, 1)}
          </span>
        )}
      </Button>
      <div className={`user-dropdown ${open ? "is-open" : ""}`.trim()} role="dialog" aria-label="User menu">
        <div className="user-dropdown__header" title={user.email || user.name || ""}>
          {user.name || user.email || "Account"}
        </div>
        <Button
          type="button"
          appearance="subtle"
          size="small"
          shape="square"
          style={{
            justifyContent: "flex-start",
            fontSize: "inherit",
          }}
          pressEffect={false}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
          <span>Sign out</span>
        </Button>
      </div>
    </div>
  );
}
