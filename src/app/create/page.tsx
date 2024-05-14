import Link from "next/link";

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
  return (
    <form className="flex flex-col items-center justify-center gap-4 p-4">
      <input
        type="text"
        placeholder="Enter Title"
        className="input input-bordered w-full lg:max-w-4xl"
      />
      <textarea
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
