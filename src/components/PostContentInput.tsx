"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, type MutableRefObject } from "react";

export default function TiptapPostContentInput({
  contentRef,
}: {
  contentRef: MutableRefObject<{ text: string; html: string }>;
}) {
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
        name: "content",
      },
    },
  });

  useEffect(() => {
    editor?.on("update", (props) => {
      contentRef.current.text = props.editor.getText();
      contentRef.current.html = props.editor.getHTML();
    });

    return () => {
      editor?.off("update");
    };
  }, [editor, contentRef]);

  return (
    <>
      <EditorContent className="w-full lg:max-w-4xl" editor={editor} />
    </>
  );
}
