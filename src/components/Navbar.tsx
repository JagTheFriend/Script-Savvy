"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

function UserProfileComponent() {
  const { isSignedIn } = useAuth();
  return (
    <div className="navbar-end">
      {isSignedIn ? (
        <div className="btn btn-ghost">
          <UserButton />
        </div>
      ) : (
        <Link className="btn btn-ghost" href="/auth">
          Sign in
        </Link>
      )}
    </div>
  );
}

function Content() {
  const { isSignedIn, userId } = useAuth();

  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/create">Create post</Link>
      </li>
      <li>
        <Link href="/search">Search</Link>
      </li>
      {isSignedIn && (
        <li>
          <Link href={`/profile/${userId}`}>My Posts</Link>
        </li>
      )}
    </>
  );
}

function BrandLogo() {
  return (
    <Link href="/" className="btn btn-ghost text-xl">
      Script Savvy
    </Link>
  );
}

function NavbarComponent() {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Menu Icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow"
          >
            <Content />
          </ul>
        </div>
        <BrandLogo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Content />
        </ul>
      </div>
      <UserProfileComponent />
    </div>
  );
}

export default function Navbar() {
  return (
    <section className="sticky top-0 z-50 opacity-95">
      <NavbarComponent />
    </section>
  );
}
