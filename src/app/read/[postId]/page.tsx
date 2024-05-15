import DisplayError from "~/components/DisplayError";
import { getPostContent } from "~/lib/actions";

export default async function ReadPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const returnedData = await getPostContent(postId);

  if (returnedData.error) {
    return <DisplayError />;
  }

  return <section className="mt-5 flex flex-col px-1">{postId}</section>;
}
