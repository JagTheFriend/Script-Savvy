"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { getUserDetail } from "./utils";

export async function getUserById(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    const details = getUserDetail(user);
    return {
      error: false,
      message: "",
      ...details,
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
  const description = formData.get("description") as string;
  const { userId: authorId } = auth();

  if (!authorId) {
    return { error: true, message: "Unauthorized", postId: "" };
  }

  try {
    const post = await db.post.create({
      data: {
        title,
        content,
        authorId,
        description,
      },
    });
    revalidatePath("/", "page");
    return { error: false, message: "Post created", postId: post.id };
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong!",
      postId: "",
    };
  }
}

export async function getPosts(limit = 10) {
  try {
    const { data: users } = await clerkClient.users.getUserList({
      limit: 10,
    });

    const posts = await db.post.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        authorId: {
          in: users.map((user) => user.id),
        },
      },
    });

    const returnData = [];

    for (const post of posts) {
      const user = users.find((user) => user.id === post.authorId);
      if (!user) continue;

      const details = getUserDetail(user);

      returnData.push({
        post: post,
        author: details,
      });
    }

    return {
      error: false,
      message: "",
      data: returnData,
    };
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong!",
      posts: [],
    };
  }
}
