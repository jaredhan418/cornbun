import { auth } from "@/auth";
import { fetchFleetCNApi } from "@/app/serviceUtil";

export async function GET(request: Request) {
  const session = await auth();

  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error('Not has token');
  }

  const { searchParams } = new URL(request.url);

  const vin = searchParams.get("vin");

  const res = await fetchFleetCNApi<{
    response: any[];
    pagination: any;
    count: number;
  }>(`vehicles/${vin}/wake_up`, { headers: {
    Authorization: `Bearer ${accessToken}`
  }})

  return Response.json(res);
}