'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';

export async function addGroup(groupCode: string) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error('not login');

  const vinGroup = await prisma.vinGroup.findFirst({
    where: {
      groupCode,
    },
  });

  if (vinGroup) {
    const vinInfo = await prisma.vininfo.findFirst({
      where: {
        userId,
      },
    });

    if (!vinInfo) throw new Error('add group failure');

    const result = await prisma.vininfo.update({
      where: {
        id: vinInfo.id,
      },
      data: {
        groupCode,
      },
    });

    return vinGroup;
  }

  throw new Error('add group failure');
}

export async function getAllVinInGroup(groupCode: string) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error('not login');

  const vinGroup = await prisma.vinGroup.findFirst({
    where: {
      groupCode,
    },
  });

  if (vinGroup) {
    const vinsInfo = await prisma.vininfo.findMany({
      where: {
        groupCode,
      },
    });

    if (vinsInfo.length === 0) throw new Error('No vin in group');

    return vinsInfo;
  }

  throw new Error('add group failure');
}
