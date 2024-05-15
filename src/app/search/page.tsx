export default function SearchPage({
  params: _params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { q: string };
}) {
  return <>{searchParams?.q}</>;
}
