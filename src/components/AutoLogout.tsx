import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, toast, type ToastOptions } from "@polyutils/components";

const TIMEOUT = 10 * 60 * 1000; // 10 minutes
const WARNING_TIME = 1 * 60 * 1000; // show warning 1 min before logout

export default function AutoLogout() {
  const { logout, isAuthenticated } = useAuth0();
  const [showWarning, setShowWarning] = useState(false);
  const toastIdRef = useRef<string | null>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const showWarningRef = useRef<boolean>(false);
  useEffect(() => {
    showWarningRef.current = showWarning;
  }, [showWarning]);

  useEffect(() => {
    if (!isAuthenticated) return;
    // Never log out in development mode
    if (import.meta.env.DEV) return;

    let logoutTimer: number;
    let warningTimer: number;
    // countdown handled inside the toast content component

    const resetTimers = () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      // Keep warning visible if already shown; do not hide the toast here

      // warning fires before logout
      warningTimer = window.setTimeout(() => {
        setShowWarning(true);
        // countdown handled inside the toast content component
      }, TIMEOUT - WARNING_TIME);

      // actual logout
      logoutTimer = window.setTimeout(() => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      }, TIMEOUT);
    };

    resetRef.current = resetTimers;

    const clickHandler = () => {
      // If warning toast is showing, ignore activity; require explicit confirmation
      if (showWarningRef.current) return;
      resetTimers();
    };

    // listen for user activity (only clicks)
    window.addEventListener("click", clickHandler);

    resetTimers();

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      window.removeEventListener("click", clickHandler);
      if (resetRef.current === resetTimers) {
        resetRef.current = null;
      }
    };
  }, [isAuthenticated, logout]);

  // Show a single persistent toast when warning is active
  useEffect(() => {
    if (!showWarning) {
      if (toastIdRef.current) {
        toast.remove(toastIdRef.current);
        toastIdRef.current = null;
      }
      return;
    }

    if (toastIdRef.current) return; // already shown

    const options: ToastOptions = {
      theme: "dark",
      closeIcon: null,
      duration: 0, // persistent
      dismissOnClick: false,
      position: "bottomRight",
      icons: { info: null },
      draggable: "never",
    };

    const id = toast.info(
      (
        <WarningToastContent
          initialSeconds={Math.floor(WARNING_TIME / 1000)}
          onExtend={() => {
            setShowWarning(false);
            // Explicitly reset timers when user confirms extending the session
            resetRef.current?.();
            toast.info("Your session has been extended.", {
              duration: 3000,
              dismissOnClick: true,
              theme: "colored",
            });
          }}
          onClose={() => {
            if (toastIdRef.current) toast.remove(toastIdRef.current);
            toastIdRef.current = null;
          }}
        />
      ),
      options
    );
    toastIdRef.current = id;

    return () => {
      if (toastIdRef.current) {
        toast.remove(toastIdRef.current);
        toastIdRef.current = null;
      }
    };
  }, [showWarning]);

  return null;
}

function WarningToastContent({
  initialSeconds,
  onExtend,
  onClose,
}: {
  initialSeconds: number;
  onExtend: () => void;
  onClose: () => void;
}) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
    if (initialSeconds <= 0) return;
    const interval = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [initialSeconds]);

  return (
    <div
      role="dialog"
      aria-live="polite"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
    >
      <p style={{ marginTop: 5 }}>
        You will be logged out in {seconds}s due to inactivity.
      </p>
      <Button
        appearance="primary"
        size="small"
        onClick={() => {
          onExtend();
          onClose();
        }}
      >
        Stay Logged In
      </Button>
    </div>
  );
}
