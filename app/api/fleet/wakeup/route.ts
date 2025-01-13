import { auth } from '@/auth';
import { fetchFleetCNApi } from '@/app/serviceUtil';
import { prisma } from '@/prisma';

export async function GET(request: Request) {
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

  const res = await fetchFleetCNApi
    .post<{
      response: any[];
      pagination: any;
      count: number;
    }>(`vehicles/${vin}/wake_up`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();

  return Response.json(res);
}
