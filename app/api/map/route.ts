import { BAIDU_AK_SERVER } from '@/app/constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  searchParams.append('ak', BAIDU_AK_SERVER);
  const queryString = searchParams.toString();

  const res = await fetch(`https://api.map.baidu.com/place/v2/suggestion?${queryString}`);
  const data = await res.json();

  return Response.json(data);
}
