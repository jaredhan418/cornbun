import { auth } from '@/auth';
import { prisma } from '@/prisma';

export async function POST(request: Request) {
  const session = await auth();

  const userId = session?.user?.id;

  const account = await prisma.account.findFirst({
    where: {
      userId,
    },
  });

  const accessToken = account?.access_token;

  if (!accessToken) {
    throw new Error('Not has token');
  }

  const reqJson = await request.json();

  const newGroup = await prisma.vinGroup.create({
    data: {
      groupCode: reqJson.groupCode,
      groupName: reqJson.groupName,
      ownerId: account.userId,
    },
  });

  return Response.json(newGroup);
}
