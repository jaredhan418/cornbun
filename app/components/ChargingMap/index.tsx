import React, { useEffect, useState } from 'react';
import mock_stations from '@/app/mocks/charging_stations.json';
import ChargingItem from '../ChargingItem';
import CharginDetails from '../ChargingDetails';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

function ChargingMap() {
  const router = useRouter();
  const [searchActivated, setSearchActivated] = useState<boolean>(false);

  useEffect(() => {
    const el = document.getElementById('charging-list-container');

    document.addEventListener('click', e => {
      if (!el?.contains(e.target as Node)) {
        setSearchActivated(false);
      }
    });
  }, []);

  const onSearch = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <div className='absolute top-8 left-8 flex' style={{ zIndex: 1000 }}>
      <Button className='!h-12 !rounded mr-2 !border-none !shadow-md' onClick={() => router.push('/')}>
        <LeftOutlined />
      </Button>
      <div id='charging-list-container' className='shadow-md' onClick={() => setSearchActivated(true)}>
        <div id='charging-input' className='left-5 !w-96 z-1'>
          <input
            className={`w-full ${searchActivated ? 'rounded-t border-b' : 'rounded'} h-12 px-8 outline-none`}
            placeholder='搜索充电站'
            onChange={onSearch}
          />
          {searchActivated && (
            <div className='bg-white rounded-b px-4'>
              {mock_stations.map((station, i) => (
                <ChargingItem station={station} key={station.id} className={`px-2 py-3 ${i !== mock_stations.length - 1 ? 'border-b' : ''}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CharginDetails />
    </div>
  );
}

export default ChargingMap;
