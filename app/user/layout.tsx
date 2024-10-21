import { redirect } from 'next/navigation';
import { Theme } from '@radix-ui/themes';
import * as React from 'react';

import { auth } from '../../auth';

export default async function UserLayout({ children }: React.PropsWithChildren) {
  const session = await auth();

  if (!session?.user?.name) {
    redirect('/login');
  }

  return <Theme>{children}</Theme>;
}
