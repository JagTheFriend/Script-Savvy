import { User } from "@clerk/nextjs/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CustomUserType } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserDetail(user: User): CustomUserType {
  return {
    id: user.id,
    username:
      user.username ??
      user.firstName ??
      user.lastName ??
      user.fullName ??
      "Unknown",
    email: user.emailAddresses[0]?.emailAddress ?? "unknown",
    image: user.imageUrl,
    dateJoined: user.createdAt,
  };
}
