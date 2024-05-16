export const metadata = {
  title: "Authentication",
  description: "login page for Script Savvy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#56a360] to-[#323adb] text-white">
      {children}
    </main>
  );
}
