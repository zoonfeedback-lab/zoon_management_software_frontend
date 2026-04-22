import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "zoon Client Portal",
  description: "Precision engineering dashboard for projects, payments, and reviews.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0b0d] text-[14px] text-zinc-100 antialiased md:[zoom:0.9] 2xl:[zoom:0.86]">
        {children}
      </body>
    </html>
  );
}
