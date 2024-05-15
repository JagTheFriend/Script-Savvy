import type { Post } from "@prisma/client";
import Link from "next/link";
import { toast } from "react-toastify";
import { getPosts } from "~/lib/actions";
import type { CustomUserType } from "~/lib/type";

function DisplayUsername({
  user,
  dateCreated,
}: {
  user: CustomUserType;
  dateCreated: Date;
}) {
  return (
    <div className="flex flex-row items-center gap-2 text-black">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={user.image} alt={"Profile Image"} />
        </div>
      </div>
      <div className="flex flex-col gap-0">
        <Link
          href={`/profile/${user.id}`}
          className="cursor-pointer text-lg font-medium"
        >
          {user.username}
        </Link>
        <p className="cursor-default text-sm font-extralight">
          {dateCreated.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

function PostContent(props: { post: Post; user: CustomUserType }) {
  const { post } = props;

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white text-gray-900 shadow-md">
      <div className="p-5">
        <DisplayUsername user={props.user} dateCreated={post.createdAt} />
        <h5 className="mb-2 text-2xl font-bold tracking-tight ">
          {post.title}
        </h5>
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
