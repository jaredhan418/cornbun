import { useAppStore } from '@/app/providers';
import { useMap } from '@uiw/react-baidu-map';
import { Drawer } from 'antd';
import Search from 'antd/es/input/Search';
import React from 'react';

function ChargingMap() {
  const { currentStation, setCurrentStation } = useAppStore(s => s);

  const onSearch = (e: any) => {
    console.log(e.target.value);
  };

  const onClose = () => {
    setCurrentStation(null);
  };

  return (
    <div className='absolute top-3 left-3'>
      <Search className='absolute m-5 left-5 !w-80' style={{ zIndex: 1000 }} placeholder='input search text' onSearch={onSearch} enterButton />

      <Drawer title='Basic Drawer' onClose={onClose} open={currentStation !== null} mask={false}>
        {currentStation !== null && (
          <>
            <p>{currentStation?.data?.name}</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </>
        )}
      </Drawer>
    </div>
  );
}

export default ChargingMap;
