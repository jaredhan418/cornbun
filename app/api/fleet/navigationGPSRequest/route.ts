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

  const vin = searchParams.get('vin');

  const reqJson = await request.json();

  const res = await fetchFleetCNApi
    .post<{
      response: any[];
      pagination: any;
      count: number;
    }>(`vehicles/${vin}/command/navigation_gps_request`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: reqJson,
    })
    .json();

  return Response.json(res);
}
