import DisplayError from "~/components/DisplayError";
import { getPostContent } from "~/lib/actions";

export default async function ReadPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const returnedData = await getPostContent(postId);

  if (returnedData.error || !returnedData.post) {
    return <DisplayError />;
  }

  return (
    <>
      <section className="mt-5 flex flex-col break-words border-b border-gray-700 px-1">
        <p className="text-3xl font-bold">{returnedData.post.title}</p>
      </section>
      <section>
        <p>{returnedData.post.content}</p>
      </section>
    </>
  );
}
