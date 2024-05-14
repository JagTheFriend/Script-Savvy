import { clerkClient } from "@clerk/nextjs/server";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id: userId } = params;

  try {
    const user = await clerkClient.users.getUser(userId);
    console.log(user);
  } catch (error: unknown) {
    if ((error as { message: string }).message === "Not Found") {
      return (
        <section className="mt-10 flex cursor-pointer justify-center text-4xl">
          <p className="transition-all hover:underline">User Not Found!</p>
        </section>
      );
    } else {
      return (
        <section className="mt-10 flex cursor-pointer justify-center text-4xl">
          <p className="transition-all hover:underline">Something went wrong, please try again later!</p>
        </section>
      )
    }
  }

  return <section>Profile: {userId}</section>;
}
