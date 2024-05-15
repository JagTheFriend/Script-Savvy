import type { Post } from "@prisma/client";
import Link from "next/link";
import { toast } from "react-toastify";
import { getPosts } from "~/lib/actions";
import type { CustomUserType } from "~/lib/type";

function DisplayUsername(props: { img: string; username: string }) {
  return <div></div>;
}

function PostContent(props: { post: Post; user: CustomUserType }) {
  const { post } = props;

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">{post.description}</p>
        <Link
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          href={`/read/${post.id}`}
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export default async function PostContents() {
  const returnedData = await getPosts();

  if (returnedData.error) {
    return toast.error("Something went wrong!");
  }

  return (
    <section className="m-1.5 flex flex-col gap-2">
      {returnedData.data?.map((data) => (
        <PostContent key={data.post.id} post={data.post} user={data.author} />
      ))}
    </section>
  );
}
