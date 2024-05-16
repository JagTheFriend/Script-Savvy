"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { useEffect, type MutableRefObject } from "react";

function MenuButtons({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex flex-row gap-2">
      <button
        type="button"
        className="flex flex-row items-center justify-center gap-2 rounded-lg border px-2 py-1"
      >
        <BoldIcon className="h-4 w-4" />
        Bold
      </button>
      <button
        type="button"
        className="flex flex-row items-center justify-center gap-2 rounded-lg border px-2 py-1"
      >
        <ItalicIcon className="h-4 w-4" />
        Italic
      </button>
      <button
        type="button"
        className="flex flex-row items-center justify-center gap-2 rounded-lg border px-2 py-1"
      >
        <UnderlineIcon className="h-4 w-4" />
        Underline
      </button>
    </div>
  );
}

export default function TipTapPostContentInput({
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
    <div className="flex w-full flex-col gap-2 lg:max-w-4xl">
      <MenuButtons editor={editor} />
      <EditorContent className="" editor={editor} />
    </div>
  );
}
