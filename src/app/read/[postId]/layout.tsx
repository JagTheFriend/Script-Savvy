import Navbar from "~/components/Navbar";

export const metadata = {
  title: "Script Savvy",
  description: "Read a blog post",
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
