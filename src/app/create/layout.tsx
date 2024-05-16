import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Navbar from "~/components/Navbar";

export const metadata = {
  title: "Create post",
  description: "Create a blog post",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col bg-base-100 text-white">
      <Navbar />
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </main>
  );
}
