import { redirect } from 'next/navigation';
import * as React from 'react';
import { prisma } from '@/prisma';

import { auth } from '../../auth';

export default async function LoginLayout({ children }: React.PropsWithChildren) {
  const session = await auth();

  if (session?.user?.name) {
    const userId = session.user.id;
    const existVinInfo = await prisma.vininfo.findFirst({
      where: {
        userId,
      },
    });

    if (existVinInfo) {
      redirect('/');
    } else {
      redirect('/user');
    }
  }

  return <>{children}</>;
}
