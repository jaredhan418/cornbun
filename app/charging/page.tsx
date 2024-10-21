'use client';
import dynamic from 'next/dynamic';

// for window usage
const MapWrapper = dynamic(() => import('@/app/charging/components'), { ssr: false });

export default function ChargingStation() {
  return <MapWrapper />;
}
