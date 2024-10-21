'use client';
import { useRouter } from 'next/navigation';

import { QRCode, Typography, Button } from 'antd';

export default function Login() {
  const router = useRouter();

  return (
    <div>
      <Typography.Title level={3}>登录</Typography.Title>
      <Button onClick={() => router.push('api/signin')}>登录</Button>
      <Typography.Title level={3}>扫码登录</Typography.Title>
      <QRCode errorLevel='H' value='http://cornbun.fun/api/signin' icon='/images/logo.svg' />
      <br></br>
      <Typography.Title level={3}>扫码进行虚拟钥匙授权</Typography.Title>
      <QRCode errorLevel='H' value='https://www.tesla.cn/_ak/cornbun.fun' icon='/images/bolt.svg' />
    </div>
  );
}
