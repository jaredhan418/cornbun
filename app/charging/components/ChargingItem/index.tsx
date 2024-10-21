import React from 'react';
import { isCurrentTime } from '../../../utils';
import { Divider, Tag } from 'antd';
import { useAppStore } from '@/app/providers';

function ChargingItem({ station, className }: any) {
  const { map, setCurrentStation, currentStation } = useAppStore(s => s);

  const getCurrentPrice = () => {
    const idx = station.priceDetails.findIndex((p: any) => {
      return isCurrentTime(p.startTime, p.endTime);
    }, []);

    const price = station.priceDetails[idx];
    return (price?.electricityFee + price?.serviceFee).toFixed(2);
  };

  const handleItem = () => {
    if (station?.id === currentStation?.data?.id) return;

    if (currentStation?.marker) {
      map.removeOverlay(currentStation?.marker);
    }

    const icon = new BMap.Icon(`/images/${station.type}_marker.png`, new BMap.Size(56, 56));
    const point = new BMap.Point(station.lng, station.lat);
    const marker = new BMap.Marker(point, { icon });
    map.addOverlay(marker);

    setCurrentStation({ data: station, marker });
    map.panTo(point);
    setTimeout(() => {
      map.setTilt(45);
    }, 300);
  };

  return (
    <div className={className} onClick={handleItem}>
      <div className='mb-2 !flex justify-between items-center'>
        <div className='text-base text-gray-600'>{station.name}</div>
        <div className='text-sm !flex justify-start items-center'>
          <img src='/images/navigator.svg' className='w-4 mr-px rotate-45 origin-center -translate-y-px' />
          <div className='text-sm' style={{ fontSize: '12px' }}>
            0.4km
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between items-center'>
          <Tag className='status' color={station.status.available === station.status.total ? 'error' : 'success'}>
            {station.status.available === station.status.total ? '已满' : '空闲'}
            {station.status.available} / {station.status.total}
          </Tag>

          <Divider type='vertical' className='!border-gray-300' />
          <Tag className='text-sm !flex justify-between items-center' bordered={false}>
            <img src='/images/bolt.svg' className='w-4 mr-1' />
            {station.type === 'fast' ? '快充' : '超充'}
          </Tag>
          {station.isTesla && (
            <Tag
              icon={<img src='/images/logo.svg' className='w-3 mr-1' />}
              className='mr-2 text-sm !flex justify-between items-center'
              bordered={false}
            >
              {station.chargingType}
            </Tag>
          )}
        </div>
        <div className='text-xl font-medium italic text-gray-700'>
          <span className='text-sm'>￥</span>
          {getCurrentPrice()}
          <span className='text-sm ml-1'>/度</span>
        </div>
      </div>
    </div>
  );
}

export default ChargingItem;
