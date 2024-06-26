import type { Metadata } from "next";
import Link from "next/link";
import DisplayError from "~/components/DisplayError";
import PostContents from "~/components/PostContents";
import { getUserById } from "~/lib/actions";
import type { CustomUserType } from "~/lib/type";

type Props = {
  params: { userId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getUserById(params.userId);

  if (data.error ?? !data.details) {
    return { title: "Error" };
  }
  return {
    title: `Viewing profile of ${data.details.username}`,
    description: `Viewing profile of ${data.details.username}`,
  };
}

function DateJoined({ dateJoined }: { dateJoined: number }) {
  return (
    <div className="flex cursor-default flex-row items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>Date Joined Icon</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      Joined on {new Date(dateJoined).toLocaleDateString()}
    </div>
  );
}

function EmailAddress({ email }: { email: string }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>Email Icon</title>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
      <Link href={`mailto:${email}`}>{email}</Link>
    </div>
  );
}

function ProfileImage({
  image,
  username,
}: {
  image: string;
  username: string;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img src={image} alt={`${username}'s profile icon`} />
        </div>
      </div>
      <p className="cursor-default font-bold sm:text-2xl md:text-2xl lg:text-4xl">
        {username}
      </p>
    </div>
  );
}

function DisplayUsername({ user }: { user: CustomUserType }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ProfileImage image={user.image} username={user.username} />
      <div className="flex flex-col justify-center gap-2">
        <DateJoined dateJoined={user.dateJoined} />
        {user.email !== "unknown" && <EmailAddress email={user.email} />}
      </div>
    </div>
  );
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = params;
  const data = await getUserById(userId);

  if (data.error ?? !data.details) {
    return <DisplayError />;
  }

  return (
    <div className="m-5">
      <section className="flex flex-col border-b border-gray-700 pb-4">
        <DisplayUsername user={data.details} />
      </section>
      <section>
        <PostContents userId={userId} />
      </section>
    </div>
  );
}
