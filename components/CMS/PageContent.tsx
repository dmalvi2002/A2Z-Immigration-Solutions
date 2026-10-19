"use client";
import { createContext, useContext } from "react";
const PageContent = createContext<{ heading?: string; introduction?: string }>(
  {},
);
export function PageContentProvider({
  value,
  children,
}: {
  value: { heading?: string; introduction?: string };
  children: React.ReactNode;
}) {
  return <PageContent.Provider value={value}>{children}</PageContent.Provider>;
}
export function PageText({
  field,
  children,
}: {
  field: "heading" | "introduction";
  children: React.ReactNode;
}) {
  const value = useContext(PageContent)[field];
  return <>{value || children}</>;
}
