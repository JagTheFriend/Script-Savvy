"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { createPost } from "~/lib/actions";

const PostContentInput = dynamic(
  () => import("~/components/PostContentInput"),
  {
    ssr: false,
  },
);

function SubmitButton() {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <button
        type="submit"
        className="btn btn-outline btn-success"
        disabled={pending}
      >
        Post
      </button>
      <button
        className="btn btn-outline btn-warning"
        disabled={pending}
        onClick={() => void router.push("/")}
        type="button"
      >
        Cancel
      </button>
    </div>
  );
}

function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef("");

  return (
    <form
      action={async (formData) => {
        if (contentRef.current === "") {
          return toast.error("Content is required!");
        }
        formData.set("content", contentRef.current);

        const { error } = await createPost(formData);
        if (error) {
          return toast.error("Something went wrong!");
        }
        toast.success("Post created!");
        formRef.current?.reset();
      }}
      ref={formRef}
      className="flex flex-col items-center justify-center gap-4 p-4"
    >
      <input
        name="title"
        type="text"
        placeholder="Enter Title"
        className="input input-bordered w-full lg:max-w-4xl"
        required
        // biome-ignore lint/a11y/noAutofocus: Autofocus to input field
        autoFocus
      />
      <input
        name="description"
        type="text"
        placeholder="Enter Description"
        className="input input-bordered w-full lg:max-w-4xl"
        required
      />
      <PostContentInput contentRef={contentRef} />
      <SubmitButton />
    </form>
  );
}

export default function CreatePost() {
  return (
    <section className="flex flex-col">
      <Form />
    </section>
  );
}
