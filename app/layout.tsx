import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Zoonlabs Client Portal",
  description: "Precision engineering dashboard for projects, payments, and reviews.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0b0d] text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
