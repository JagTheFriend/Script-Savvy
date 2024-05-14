"use client";

import Link from "next/link";
import { useRef } from "react";
import { toast } from "react-toastify";
import { createPost } from "~/lib/actions";

function SubmitButton() {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <button type="submit" className="btn btn-outline btn-success">
        Post
      </button>
      <Link href="/" className="btn btn-outline btn-warning">
        Cancel
      </Link>
    </div>
  );
}

function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        const { error, message, postId } = await createPost(formData);
        if (error) {
          return toast.error(message);
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
      />
      <textarea
        name="content"
        placeholder="Content"
        className="textarea textarea-bordered textarea-lg w-full"
      />
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
