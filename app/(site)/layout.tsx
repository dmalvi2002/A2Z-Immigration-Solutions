import { Inter } from "next/font/google";
import "@/app/globals.css";
import SiteShell from "@/components/CMS/SiteShell";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
