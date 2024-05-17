"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, type MutableRefObject } from "react";

export default function TipTapPostContentInput({
  contentRef,
}: {
  contentRef: MutableRefObject<{ text: string; html: string }>;
}) {
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
  }, []);

  return (
    <div
      id="container"
      ref={containerRef}
      className="flex min-h-72 w-full flex-col bg-white text-black lg:max-w-4xl"
    />
  );
}
