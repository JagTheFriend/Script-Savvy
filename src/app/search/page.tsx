import SearchResult from "~/components/SearchResult";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  return (
    <>
      <SearchResult />
      {searchParams.q}
    </>
  );
}
