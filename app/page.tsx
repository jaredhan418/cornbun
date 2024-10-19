'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div>123</div>
      <Button onClick={() => router.push('map')}>充电</Button>
      <Button>车队</Button>
    </div>
  );
}
