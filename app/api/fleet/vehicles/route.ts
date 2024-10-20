import { auth } from "@/auth";
import { fetchFleetCNApi } from "@/app/serviceUtil";
import { prisma } from "@/prisma";

export async function GET() {
  const session = await auth();

  const userId = session?.user?.id;

  const account = await prisma.account.findFirst({ where: {
    userId
  }})

  const accessToken = account?.access_token;

  if (!accessToken) {
    throw new Error('Not has token')
  }

  const res = await fetchFleetCNApi<{
    response: any[];
    pagination: any;
    count: number
  }>("vehicles", { headers: {
    Authorization: `Bearer ${accessToken}`
  }})

  return Response.json(res);
}