"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, type MutableRefObject } from "react";

export default function TipTapPostContentInput({
  contentRef,
}: {
  contentRef: MutableRefObject<{ text: string; html: string }>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = document.createElement("div");
    wrapperRef.current?.appendChild(editor);

    const quill = new Quill(editor, { theme: "snow" });

    return () => {
      if (wrapperRef.current) wrapperRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div id="container" ref={wrapperRef} className="w-full lg:max-w-4xl" />
  );
}
