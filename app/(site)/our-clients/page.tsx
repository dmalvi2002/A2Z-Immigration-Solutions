import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page unavailable - A2Z",
  robots: { index: false, follow: false },
};

// Temporarily unpublished. Restore the page only once approved stories are ready.
export default function OurClientsPage() {
  notFound();
}
