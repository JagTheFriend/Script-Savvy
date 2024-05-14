import Link from "next/link";
import { getUserById } from "~/lib/actions";

function DisplayUsername(props: {
  username: string;
  image: string;
  email: string;
  dateJoined: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={props.image} />
          </div>
        </div>
        <p className="text-2xl font-bold">{props.username}</p>
      </div>
      <div>
        <div>Joined on {new Date(props.dateJoined).toLocaleDateString()}</div>
        {props.email !== "unknown" && (
          <div className="flex flex-row items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <Link href={`mailto:${props.email}`}>{props.email}</Link>
          </div>
        )}
      </div>
    </div>
  );
}

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

  return (
    <section className="mt-5 flex flex-col">
      <DisplayUsername
        username={user.username}
        image={user.image}
        dateJoined={user.dateJoined}
        email={user.email}
      />
    </section>
  );
}
