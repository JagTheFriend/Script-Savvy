"use server";

import { clerkClient } from "@clerk/nextjs/server";

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
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message ?? "Something went wrong!",
      id: "",
      username: "",
      image: "",
    };
  }
}
