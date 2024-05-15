import { SignIn, SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page({
  params: _params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { type: "sign-in" | "sign-up" };
}) {
  const searchParam = searchParams?.type ?? "sign-in";
  return (
    <>
      <h1 className="cursor-pointer text-2xl transition-all hover:underline">
        Please {searchParam === "sign-in" ? "login to" : "register for"} Script
        Savvy
      </h1>
      {searchParam === "sign-in" ? (
        <SignIn routing="hash" />
      ) : (
        <SignUp routing="hash" />
      )}
      <Link href="/" className="btn btn-link text-white">
        ← Go Back
      </Link>
    </>
  );
}
