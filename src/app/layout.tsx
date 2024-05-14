import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "~/components/ui/sonner";

export const metadata = {
  title: "Script Savvy",
  description: "Simple Blog website created using create-t3-app",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable} antialiased`}>
        <body>{children}</body>
        <Toaster />
      </html>
    </ClerkProvider>
  );
}
