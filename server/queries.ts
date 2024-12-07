import { catchError } from "@/lib/catch-error";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const [userData, userDataError] = await catchError(
    prisma.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
      include: {
        Race: true,
      },
    })
  );

  if (!userData || userDataError) {
    return null;
  }

  return { ...clerkUser, ...userData };
}