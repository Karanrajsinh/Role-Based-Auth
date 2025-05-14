"use server";

import { clerkClient, auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@/lib/types/user";

export async function getCurrentUser() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  return user;
}

export async function getUserRole(): Promise<Role | null> {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const user = await clerkClient.users.getUser(userId);

  // First check if role exists in Clerk metadata
  const role = user.publicMetadata.role as Role | undefined;

  if (role) {
    return role;
  }

  // If not in metadata, check the database
  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return dbUser?.role as Role || null;
}

export async function setUserRole(role: Role) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await clerkClient.users.getUser(userId);

  // Update Clerk metadata
  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      role,
    },
  });

  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("User email not found");
  }

  // Upsert the user in the database
  await prisma.user.upsert({
    where: {
      clerkId: userId,
    },
    update: {
      role,
    },
    create: {
      clerkId: userId,
      email,
      role,
    },
  });
}