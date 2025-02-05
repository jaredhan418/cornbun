import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import './globals.css';
import { AppStoreProvider } from './providers';

export const metadata: Metadata = {
  title: 'Cornbun',
  description: 'Your cool tesla assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>Cornbun</title>
      </head>
      <body>
        <AppStoreProvider>
          <Theme className='h-full'>
            <AntdRegistry>{children}</AntdRegistry>
          </Theme>
        </AppStoreProvider>
      </body>
    </html>
  );
}
