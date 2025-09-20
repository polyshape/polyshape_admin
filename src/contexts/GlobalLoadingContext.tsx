import { createContext, useMemo, useRef, useCallback, type ReactNode } from "react";
import { useLoading } from "@polyutils/components";

type GlobalLoadingContextValue = {
  startLoading: () => void;
  stopLoading: () => void;
};

const GlobalLoadingContext = createContext<GlobalLoadingContextValue | undefined>(undefined);

export { GlobalLoadingContext };

export function GlobalLoadingProvider({ children }: { children: ReactNode }) {
  const { setLoadingState } = useLoading();
  const counterRef = useRef(0);

  const startLoading = useCallback(() => {
    counterRef.current += 1;
    if (counterRef.current === 1) {
      setLoadingState("loading");
    }
  }, [setLoadingState]);

  const stopLoading = useCallback(() => {
    if (counterRef.current === 0) {
      return;
    }
    counterRef.current -= 1;
    if (counterRef.current === 0) {
      setLoadingState(null);
    }
  }, [setLoadingState]);

  const value = useMemo(() => ({ startLoading, stopLoading }), [startLoading, stopLoading]);

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
    </GlobalLoadingContext.Provider>
  );
}
