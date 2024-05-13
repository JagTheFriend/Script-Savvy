import Navbar from "~/components/Navbar";
import PostContents from "~/components/PostContents";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-base-100 text-white">
      <Navbar />
      <PostContents />
    </main>
  );
}
