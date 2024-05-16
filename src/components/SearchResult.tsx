"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [debouncedQuery] = useDebounce(query, 1000);

  // biome-ignore lint/correctness/useExhaustiveDependencies: No need to add router to dependencies
  useEffect(() => {
    const urlParams = new URLSearchParams({ q: debouncedQuery });
    router.push(`/search?${urlParams.toString()}`);
  }, [debouncedQuery]);

  return (
    <div className="m-5">
      <section className="flex flex-col border-b border-gray-700 pb-4">
        <form
          className="flex flex-col items-center justify-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="input input-bordered flex items-center gap-2">
            <input
              name="query"
              type="text"
              className="grow"
              placeholder="Search"
              defaultValue={query}
              onInput={(e) => {
                setQuery(e.currentTarget.value.trim() ?? "");
              }}
              required
              // biome-ignore lint/a11y/noAutofocus: Autofocus to search input field
              autoFocus
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <title>Search Icon</title>
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </form>
      </section>
    </div>
  );
}
