/**
 * Generates fake data for the blog posts
 */

import { faker } from "@faker-js/faker";
import { PrismaClient, type Post } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const client = new PrismaClient({
  log: ["query", "error", "warn"],
});

const DEMO_AUTHORS = [
  "user_2gakdgf51xnFJaCCa7RVVTsr4bY",
  "user_2gakb8JaPDhOjJ1Gd1LvXf4Uwmg",
  "user_2gakZBN5K2OR0juMfco76oQhSfC",
  "user_2gakWy9pjHLRQ3cU3F3asJXZ1Zi",
  "user_2gakUrTQ5e1X78mkCP3aBD7xziM",
  "user_2gakRrwcuzUgWQeBGMVTvtFvb99",
  "user_2gakPfY78zlOZkdmnYDeuMBQVAF",
  "user_2gakNIgYCg79JpO4Vvj2vwj69fc",
  "user_2gakKIm97vo7psQmxWulQhNS7lH",
  "user_2gQHWjoFR8BZgBrUmfdymTbtoYC",
];

function generateData() {
  const data: Post[] = [];
  for (let _ = 0; _ < 100; _++) {
    const id = uuidv4();
    const title = faker.hacker.phrase();
    const description = faker.git.commitMessage();

    let content = `<h1>${faker.hacker.phrase()}</h1>`;
    content += faker.lorem.paragraphs(4, "<br>");

    content = `<h2>${faker.hacker.phrase()}</h2>`;
    content += faker.lorem.paragraphs(4, "<br>");

    content = `<h3>${faker.hacker.phrase()}</h1>`;
    content += faker.lorem.paragraphs(4, "<br>");

    const authorId = DEMO_AUTHORS[
      Math.floor(Math.random() * DEMO_AUTHORS.length)
    ] as string;

    const post: Post = {
      createdAt: new Date(),
      id,
      authorId,
      content,
      description,
      title,
      updatedAt: new Date(),
    };
    data.push(post);
  }
  return data;
}

async function main() {
  const data = generateData();

  console.log("Generated data");
  await client.post.createMany({ data });
  console.log("Saved data");
}

main();
