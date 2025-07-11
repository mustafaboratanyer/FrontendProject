import type { Metadata } from "next";
import "./globals.css";
import { TohumProvider } from "./context/TohumContext";

export const metadata: Metadata = {
  title: "My App",
  description: "A farming application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TohumProvider>
          {children}
        </TohumProvider>
      </body>
    </html>
  );
}
