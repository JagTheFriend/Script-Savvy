import DisplayError from "~/components/DisplayError";
import { PostContent } from "~/components/PostContents";
import SearchResult from "~/components/SearchResult";
import { getPostByQuery } from "~/lib/actions";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q ?? "";

  const returnedData = await getPostByQuery(query);

  return (
    <>
      <SearchResult />
      {returnedData.error && <DisplayError />}
      {returnedData.data?.length === 0 && query.length !== 0 && (
        <DisplayError text="No Results Found!" />
      )}
      <section className="m-1.5 flex flex-col items-center gap-2">
        {returnedData.data?.map((data) => {
          return (
            <PostContent
              key={data.post.id}
              post={data.post}
              user={data.author}
            />
          );
        })}
      </section>
    </>
  );
}
