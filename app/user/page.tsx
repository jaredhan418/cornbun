'use server';

import Link from 'next/link';
import { Button } from '@radix-ui/themes';
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

  if (vehicles.response.length === 0) {
    vehicles.response.push({
      vin: 'guest',
      display_name: '游客车辆',
    });
  }

  return (
    <div className='relative w-full h-full flex flex-col justify-center items-center'>
      <div className='absolute top-4 left-4 text-3xl font-bold flex'>
        <img src='/images/logo.svg' className='w-7 mr-2' />
        <span className=''>Road</span>
        <span className='text-gray-500'>Link</span>
      </div>
      <div className='pt-48'>
        <BindVin vehicles={vehicles.response} bindVin={bindVin} />

        <br />
        <Link href='/'>
          <Button variant='outline'>回到主页</Button>
        </Link>
      </div>
    </div>
  );
}
