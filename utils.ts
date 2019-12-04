import { useEffect, useState } from "react";

function usePersistedState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(
    () => JSON.parse(localStorage.getItem(key) || "null") || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState] as const;
}

export { usePersistedState };
