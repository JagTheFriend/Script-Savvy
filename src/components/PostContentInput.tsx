"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState, type MutableRefObject } from "react";

export default function TipTapPostContentInput({
  contentRef,
}: {
  contentRef: MutableRefObject<string>;
}) {
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

  const containerRef = useCallback((containerElement: HTMLDivElement) => {
    if (containerElement == null) return;

    // Remove any existing content
    containerElement.innerHTML = "";

    const editor = document.createElement("div");
    containerElement.appendChild(editor);

    const quill = new Quill(editor, {
      theme: "snow",
      placeholder: "Enter Content",
    });
    setQuillInstance(quill);
  }, []);

  useEffect(() => {
    if (quillInstance == null) return;

    quillInstance.on("text-change", (_delta, _oldDelta, _source) => {
      contentRef.current = quillInstance.root.innerHTML.trim();
    });

    return () => {
      quillInstance.off("text-change");
    };
  }, [quillInstance, contentRef]);

  return (
    <div
      id="container"
      ref={containerRef}
      className="flex min-h-72 w-full flex-col bg-white text-black lg:max-w-4xl"
    />
  );
}
