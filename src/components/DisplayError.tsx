"use client";

import Link from "next/link";

export default function DisplayError({ text }: { text: string }) {
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
