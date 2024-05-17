import type { Metadata } from "next";
import DisplayError from "~/components/DisplayError";
import { getPostContent } from "~/lib/actions";

type Props = {
  params: { postId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostContent(params.postId);

  if (data.error ?? !data.post) {
    return { title: "Error" };
  }
  return {
    title: `Reading post '${data.post.title}'`,
    description: `Reading post '${data.post.title}'`,
  };
}

export default async function ReadPostPage({ params }: Props) {
  const { postId } = params;
  const returnedData = await getPostContent(postId);

  if (returnedData.error ?? !returnedData.post) {
    return <DisplayError />;
  }

  return (
    <div className="m-2">
      <section className="flex flex-col break-words border-b border-gray-700">
        <p className="text-3xl font-bold">{returnedData.post.title}</p>
      </section>
      <section className="flex flex-col items-center break-words">
        <article
          className="prose-headings:underline prose-a:underline prose-headings:text-white prose-a:text-blue-600 prose text-white"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is safe to render
          dangerouslySetInnerHTML={{ __html: returnedData.post.content }}
        />
      </section>
    </div>
  );
}
