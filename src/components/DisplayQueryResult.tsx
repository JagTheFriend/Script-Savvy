"use server";

// https://github.com/vercel/next.js/discussions/47227#discussioncomment-5342500
// This part is important!
export const dynamic = "force-dynamic";

export default async function DisplayQueryResult() {
  return (
    <div>
      <p>Query Result</p>
    </div>
  );
}
