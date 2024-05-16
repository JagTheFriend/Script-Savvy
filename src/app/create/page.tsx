"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import PostContentInput from "~/components/PostContentInput";
import { createPost } from "~/lib/actions";

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
  const contentRef = useRef({ text: "", html: "" });
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        if (contentRef.current.text === "") {
          return toast.error("Content is required!");
        }
        formData.set("content", contentRef.current.html);

        const { error, postId } = await createPost(formData);
        if (error) {
          return toast.error("Something went wrong!");
        }
        toast.success("Post created!");
        formRef.current?.reset();
        void router.push(`/read/${postId}`);
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
