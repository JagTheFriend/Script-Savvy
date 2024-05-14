import { clerkClient, type User } from "@clerk/nextjs/server";
import Link from "next/link";

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
      return (
        <section className="mt-10 flex cursor-pointer flex-col justify-center gap-4">
          <p className="text-4xl transition-all hover:underline">
            User Not Found!
          </p>
          <Link className="btn btn-ghost" href="/">
            Go Back
          </Link>
        </section>
      );
    } else {
      return (
        <section className="mt-10 flex cursor-pointer flex-col justify-center gap-4">
          <p className="text-4xl transition-all hover:underline">
            Something went wrong!
          </p>
          <Link className="btn btn-ghost" href="/">
            Go Back
          </Link>
        </section>
      );
    }
  }

  return <section>Profile: {user.firstName}</section>;
}
