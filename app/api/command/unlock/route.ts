import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { fetchCommandApi } from "@/app/serviceUtil";

export async function GET(request: Request) {
  const session = await auth();

  const { searchParams } = new URL(request.url)

  const userId = session?.user?.id;

  const account = await prisma.account.findFirst({ where: {
    userId
  }})

  const accessToken = account?.access_token;

  if (!accessToken) {
    throw new Error('Not has token')
  }

  searchParams.append("token", accessToken);

  await fetchCommandApi("unlock", { searchParams })

  return new Response("Unlock!");
}