'use client';
import { useRouter } from 'next/navigation';

import { QRCode, Typography, Button } from 'antd';

export function Header(props: { userName?: string | null }) {
  const router = useRouter();

  const { userName } = props;

  return <div className='absolute right-4 top-4'>{userName ? userName : <Button onClick={() => router.push('/login')}>登录</Button>}</div>;
}
