"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export async function getUserById(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return {
      error: false,
      message: "",
      id: user.id,
      username:
        user.username ??
        user.firstName ??
        user.lastName ??
        user.fullName ??
        "Unknown",
      image: user.imageUrl,
      dateJoined: user.createdAt,
      email: user.emailAddresses[0]?.emailAddress || "unknown",
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message ?? "Something went wrong!",
      id: "",
      username: "",
      image: "",
      dateJoined: 0,
      email: "",
    };
  }
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const { userId: authorId } = auth();

  if (!authorId) {
    return { error: true, message: "Unauthorized" };
  }

  try {
    await db.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return { error: false, message: "Post created" };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message ?? "Something went wrong!",
    };
  }
}
