import Navbar from "~/components/Navbar";

export const metadata = {
  title: "Search blog post",
  description: "Search blog post",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col bg-base-100 text-white">
      <Navbar />
      {children}
    </main>
  );
}
