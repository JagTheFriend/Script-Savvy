import { Post } from "@prisma/client";
import { db } from "~/server/db";

function PostContent({ post }: { post: Post }) {
  return (
    <div className="mx-auto w-full">
      <div className="mb-5 rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {post.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">{post.content}</p>
          <a
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            href="#"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function PostContents() {
  const posts = await db.post.findMany({ take: 10 });

  return (
    <section className="mx-1.5 mt-4 flex flex-col gap-1">
      {posts.map((post) => (
        <PostContent key={post.id} post={post} />
      ))}
    </section>
  );
}
