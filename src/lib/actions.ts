"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import type { Post } from "@prisma/client";
import { redirect } from "next/navigation";
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

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title,
        content,
        authorId,
        description,
      },
    });
  } catch (error) {
    return { error: true };
  }
  redirect(`/read/${post.id}`);
}

export async function getPostByQuery(query: string, limit = 10) {
  if (!query) {
    return { error: false };
  }
  try {
    const posts = await db.post.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        title: {
          contains: query,
        },
      },
    });

    const userIds = posts.map((post) => post.authorId);
    const usersPromise = clerkClient.users.getUserList({
      userId: userIds,
    });

    const [usersResponse] = await Promise.all([usersPromise]);

    const users = usersResponse.data;
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

    const userIds = posts.map((post) => post.authorId);
    const usersPromise = clerkClient.users.getUserList({
      userId: userIds,
    });

    const [usersResponse] = await Promise.all([usersPromise]);

    const users = usersResponse.data;
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
