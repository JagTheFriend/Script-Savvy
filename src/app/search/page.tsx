import DisplayError from "~/components/DisplayError";
import SearchResult from "~/components/SearchResult";
import { getPostByQuery } from "~/lib/actions";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q ?? "";

  const data = await getPostByQuery(query);

  return (
    <>
      <SearchResult />
      {data.error && <DisplayError />}
      {!data.data && query.length !== 0 && (
        <DisplayError text="No Results Found" />
      )}
    </>
  );
}
