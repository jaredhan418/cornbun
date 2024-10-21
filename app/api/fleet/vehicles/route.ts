import { auth } from '@/auth';
import { fetchFleetCNApi } from '@/app/serviceUtil';
import { prisma } from '@/prisma';

export async function GET() {
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

  // const res = await fetchFleetCNApi.get<{
  //   response: any[];
  //   pagination: any;
  //   count: number
  // }>("vehicles", { headers: {
  //   Authorization: `Bearer ${accessToken}`
  // }}).json();

  // return Response.json(res);

  const vehicles = {
    response: [
      {
        id: 367133673657227,
        vehicle_id: 1126138758039690,
        vin: 'LRWYGCFJ3MC071324',
        color: null,
        access_type: 'OWNER',
        display_name: "Jared's Model Y",
        option_codes: null,
        granular_access: [Object],
        tokens: null,
        state: 'offline',
        in_service: false,
        id_s: '367133673657227',
        calendar_enabled: true,
        api_version: 79,
        backseat_token: null,
        backseat_token_updated_at: null,
        ble_autopair_enrolled: false,
      },
      {
        id: 366870897133611,
        vehicle_id: 1126426796397354,
        vin: 'LRW3E7ET0RC214201',
        color: null,
        access_type: 'DRIVER',
        display_name: "Sherry's M3P",
        option_codes: null,
        granular_access: [Object],
        tokens: null,
        state: 'offline',
        in_service: false,
        id_s: '366870897133611',
        calendar_enabled: true,
        api_version: 79,
        backseat_token: null,
        backseat_token_updated_at: null,
        share_type_s: 'ADD_DRIVER_EXTERNAL',
        ble_autopair_enrolled: false,
      },
    ],
  };

  return Response.json(vehicles);
}
