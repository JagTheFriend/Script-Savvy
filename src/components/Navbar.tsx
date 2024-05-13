"use client";

import Link from "next/link";

function UserProfile() {
  return (
    <div className="navbar-end">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Content() {
  return (
    <>
      <li>
        <Link href="/search">Search</Link>
      </li>
      <li>
        <Link href="/my-posts">My Posts</Link>
      </li>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Content />
          </ul>
        </div>
        <BrandLogo />
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* Dropdown content for smaller device */}
        <ul className="menu menu-horizontal bg-base-200 px-1">
          <Content />
        </ul>
      </div>
      <UserProfile />
    </div>
  );
}

export default function Navbar() {
  return (
    <section>
      <NavbarComponent />
    </section>
  );
}
