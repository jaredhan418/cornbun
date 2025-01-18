import { APILoader, Provider } from '@uiw/react-baidu-map';
import React from 'react';
import BaiduMap from './BaiduMap';
import { BAIDU_AK_CLIENT } from '../../constants';
import FleetView from './FleetView';

import mock_data from '@/mocks/fleet.json';

function MapWrapper() {
  const [mapData, setMapData] = React.useState(mock_data);

  const renewMapData = (vins: { lat: string; lng: string; vin: string }[]) => {
    setMapData(prev => {
      const newData = [...prev];
      vins.forEach((vin, index) => {
        newData.unshift({
          lat: parseFloat(vin.lat ?? '39.916979'),
          lng: parseFloat(vin.lng ?? '116.484344'),
          name: vin.vin,
          id: (index + 1) * 100,
          icon: 'vehicle',
          distance: 10,
        });
      });
      return newData;
    });
  };

  return (
    <div className='w-full h-full'>
      <APILoader akay={BAIDU_AK_CLIENT} type='webgl' version='3.0'>
        <Provider>
          <BaiduMap mapData={mapData} />
        </Provider>
      </APILoader>

      <FleetView mapData={mapData} onGetVehicle={renewMapData} />
    </div>
  );
}

export default MapWrapper;
