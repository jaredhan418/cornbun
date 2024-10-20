import { auth } from "@/auth";
import { fetchFleetCNApi } from "@/app/serviceUtil";

export async function GET() {
  const session = await auth();

  const accessToken = session?.accessToken;

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