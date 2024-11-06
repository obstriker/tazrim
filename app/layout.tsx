import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/theme.css";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Annual Cashflow Report Generator",
  description: "Generate comprehensive financial reports for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(98,38,208,0.05),rgba(0,0,0,0))]" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}