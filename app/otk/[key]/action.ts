'use server';

import { prisma } from '@/prisma';
import { fetchCommandApi } from '../../serviceUtil';

export async function unlockFrunk(key: string) {
  if (!key) {
    throw new Error('Not has valid key');
  }

  const otk = await prisma.otk.findFirst({
    where: {
      otkKey: key,
      feature: "2",
    }
  })

  if (!otk) {
    throw new Error('Not has valid key');    
  }

  const searchParams = new URLSearchParams();
  searchParams.append('token', otk.accessToken);
  searchParams.append('vin', otk.vin);

  const res = await fetchCommandApi('openFrunk', { searchParams }).text();

  await prisma.otk.delete({
    where: {
      id: otk.id,
    }
  })

  return res;
}

export async function findVehicle(key: string) {
  if (!key) {
    throw new Error('Not has valid key');
  }

  const otk = await prisma.otk.findFirst({
    where: {
      otkKey: key,
      feature: "1",
    }
  })

  if (!otk) {
    throw new Error('Not has valid key');    
  }

  const searchParams = new URLSearchParams();
  searchParams.append('token', otk.accessToken);
  searchParams.append('vin', otk.vin);

  const res = await fetchCommandApi('otkFind', { searchParams }).text();

  await prisma.otk.delete({
    where: {
      id: otk.id,
    }
  })

  return res;
}