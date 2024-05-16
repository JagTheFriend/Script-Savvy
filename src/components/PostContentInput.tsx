"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapPostContentInput() {
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
}
