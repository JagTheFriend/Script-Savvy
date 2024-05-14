import { clerkClient, type User } from "@clerk/nextjs/server";
import Link from "next/link";

function DisplayError({ text }: { text: string }) {
  return (
    <section className="mt-10 flex cursor-pointer flex-col justify-center gap-4">
      <p className="text-4xl transition-all hover:underline">{text}</p>
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
  let user: User;

  try {
    user = await clerkClient.users.getUser(userId);
  } catch (error: unknown) {
    if ((error as { message: string }).message === "Not Found") {
      return <DisplayError text="User not found" />;
    } else {
      return <DisplayError text="Something went wrong" />;
    }
  }

  return <section>Profile: {user.firstName}</section>;
}
