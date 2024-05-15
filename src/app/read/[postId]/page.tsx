export default async function ReadPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  return <>{postId}</>;
}
