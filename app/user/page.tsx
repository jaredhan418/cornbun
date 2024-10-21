'use server';

import { fetchApi } from '../serviceUtil';
import { BindVin } from './bindVin';

import { auth } from '@/auth';
import { prisma } from '@/prisma';

export default async function User() {
  const vehicles = (await (await fetchApi('fleet/vehicles')).json()) as any;

  const bindVin = async (vin: string) => {
    'use server';
    const session = await auth();

    const userId = session?.user?.id;

    const existVinInfo = await prisma.vininfo.findFirst({
      where: {
        userId,
      },
    });

    if (existVinInfo) {
      const bindvin = await prisma.vininfo.update({
        where: {
          id: existVinInfo.id,
        },
        data: {
          vin,
          userId: userId ?? '',
        },
      });

      return bindvin;
    } else {
      const bindvin = await prisma.vininfo.create({
        data: {
          vin,
          userId: userId ?? '',
        },
      });

      return bindvin;
    }
  };

  return (
    <div>
      <BindVin vehicles={vehicles.response} bindVin={bindVin} />
    </div>
  );
}
