"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "textarea input-bordered textarea-lg w-full lg:max-w-4xl",
      },
    },
  });

  return <EditorContent className="w-full lg:max-w-4xl" editor={editor} />;
};

export default Tiptap;

function PostContentInput() {
  return (
    <textarea
      name="content"
      placeholder="Enter Content"
      className="textarea input-bordered textarea-lg w-full lg:max-w-4xl"
      required
    />
  );
}
