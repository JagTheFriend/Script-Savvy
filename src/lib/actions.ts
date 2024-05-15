"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { getUserDetail } from "./utils";

export async function getUserById(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    const details = getUserDetail(user);
    return { details };
  } catch (error) {
    return {
      error: true,
    };
  }
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const description = formData.get("description") as string;
  const { userId: authorId } = auth();

  if (!authorId) {
    return { error: true };
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
    return { postId: post.id };
  } catch (error) {
    return { error: true };
  }
}

export async function getPostByQuery(query: string, limit = 10) {}

export async function getPostByUser(userId: string, limit = 10) {
  try {
    const user = await clerkClient.users.getUser(userId);
    const posts = await db.post.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        authorId: userId,
      },
    });

    const details = getUserDetail(user);

    return {
      data: posts.map((post) => ({
        post,
        author: details,
      })),
    };

  } catch (error) {
    return { error: true };
  }
}

export async function getPosts(limit = 10) {
  try {
    const posts = await db.post.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const { data: users } = await clerkClient.users.getUserList({
      limit: 10,
      userId: posts.map((post) => post.authorId),
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
      data: returnData,
    };
  } catch (error) {
    return { error: true };
  }
}

export async function getPostContent(postId: string) {
  try {
    const post = await db.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return { error: true };
    }

    return {
      post,
    };
  } catch (error) {
    return { error: true };
  }
}
