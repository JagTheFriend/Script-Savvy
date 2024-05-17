import { faker } from "@faker-js/faker";
import { PrismaClient, type Post } from "@prisma/client";

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

async function generateFakePosts(count = 10) {
  const actions: Promise<Post>[] = [];

  // create a for loop which runs count times
  for (let i = 0; i < count; i++) {
    const title = faker.hacker.phrase();
    const description = faker.lorem.sentence();

    let content = `<h1>${faker.hacker.phrase()}</h1><br>`;
    content += faker.lorem.paragraphs(4, "<br>");

    content = `<h2>${faker.hacker.phrase()}</h2><br>`;
    content += faker.lorem.paragraphs(4, "<br>");

    content = `<h3>${faker.hacker.phrase()}</h1><br>`;
    content += faker.lorem.paragraphs(4, "<br>");

    const authorId = DEMO_AUTHORS[
      Math.floor(Math.random() * DEMO_AUTHORS.length)
    ] as string;

    const post = client.post.create({
      data: {
        authorId,
        title,
        description,
        content,
      },
    });

    actions.push(post);
  }

  await Promise.all(actions);
}

generateFakePosts();
