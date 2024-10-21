import { auth } from '@/auth';
import { fetchFleetCNApi } from '@/app/serviceUtil';
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

  const { searchParams } = new URL(request.url);

  const groupId = searchParams.get('groupId');

  const vins = await prisma.vininfo.findMany({
    where: {
      groupId,
    },
  });

  const reqJson = await request.json();

  const groupReq = vins.map(vin => {
    return fetchFleetCNApi.post<{
      response: any[];
      pagination: any;
      count: number;
    }>(`vehicles/${groupId}/command/navigation_gps_request`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: reqJson,
    });
  });

  const result = Promise.all(groupReq);

  return Response.json({ status: 'OK' });
}
