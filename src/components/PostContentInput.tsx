"use client";

export default function PostContentInput() {
  return (
    <textarea
      name="content"
      placeholder="Enter Content"
      className="textarea input-bordered textarea-lg w-full lg:max-w-4xl"
      required
    />
  );
}
