'use client';
import { useRouter } from 'next/navigation';

import { QRCode, Typography, Button } from 'antd';

export default function Login() {
  const router = useRouter();

  return (
    <div className='relative w-full h-full flex flex-col justify-center items-center'>
      <div className='absolute top-4 left-4 text-3xl font-bold flex'>
        <img src='/images/logo.svg' className='w-7 mr-2' />
        <span className=''>Road</span>
        <span className='text-gray-500'>Link</span>
      </div>
      <Typography.Title level={3}>登录</Typography.Title>
      <Button className='mb-4' onClick={() => router.push('api/signin')}>
        登录
      </Button>
      <Typography.Title level={3}>扫码登录</Typography.Title>
      <QRCode className='mb-4' errorLevel='H' value='http://cornbun.fun/api/signin' icon='/images/logo.svg' />
      <p>扫码登录后请刷新</p>
      <br></br>
      <Typography.Title level={3}>扫码进行虚拟钥匙授权</Typography.Title>
      <QRCode errorLevel='H' value='https://www.tesla.cn/_ak/cornbun.fun' icon='/images/bolt.svg' />
    </div>
  );
}
