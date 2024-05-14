import Link from "next/link";
import { getUserById } from "~/lib/actions";

function DisplayError({ text }: { text: string }) {
  return (
    <section className="mt-10 flex flex-col items-center justify-center gap-4">
      <p className="cursor-default text-4xl transition-all hover:underline">
        {text}
      </p>
      <Link className="btn btn-ghost" href="/">
        Go Back
      </Link>
    </section>
  );
}

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id: userId } = params;
  const user = await getUserById(userId);

  if (user.error) {
    return <DisplayError text={user.message} />;
  }

  return <section>Profile: {user.username}</section>;
}
