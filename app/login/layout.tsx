import { redirect } from 'next/navigation';
import * as React from 'react';

import { auth } from '../../auth';

export default async function LoginLayout({ children }: React.PropsWithChildren) {
  const session = await auth();

  if (session?.user?.name) {
    redirect('/');
  }

  return <main>{children}</main>;
}
