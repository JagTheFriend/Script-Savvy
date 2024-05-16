"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapPostContentInput() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Content of Post",
      }),
    ],
    editorProps: {
      attributes: {
        class: "textarea input-bordered textarea-lg w-full lg:max-w-4xl",
      },
    },
  });

  return <EditorContent className="w-full lg:max-w-4xl" editor={editor} />;
}
