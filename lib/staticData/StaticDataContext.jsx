"use client";

import { createContext, useContext, useMemo } from "react";
import { staticData } from "./staticData";

const StaticDataContext = createContext(null);

export function StaticDataProvider({ children }) {
  const value = useMemo(() => staticData, []);
  return (
    <StaticDataContext.Provider value={value}>
      {children}
    </StaticDataContext.Provider>
  );
}

export function useStaticData() {
  const ctx = useContext(StaticDataContext);
  if (ctx == null) {
    throw new Error("useStaticData must be used within StaticDataProvider");
  }
  return ctx;
}
