"use client";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  return <section>Profile</section>;
}
