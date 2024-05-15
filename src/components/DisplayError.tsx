"use client";

export default function DisplayError({ text }: { text?: string }) {
  return (
    <section className="mt-10 flex flex-col items-center justify-center gap-4">
      <p className="cursor-default text-center text-4xl transition-all hover:underline">
        {text ?? "Something went wrong!"}
      </p>
    </section>
  );
}
