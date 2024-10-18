import { APILoader, Provider } from '@uiw/react-baidu-map';
import BaiduMap from './BaiduMap';
import { BAIDU_AK } from '../constants';
import ChargingMap from '@/app/components/ChargingMap';

function MapWrapper() {
  return (
    <div className='w-full h-full'>
      <APILoader akay={BAIDU_AK} type='webgl' version='3.0'>
        <Provider>
          <BaiduMap />
        </Provider>
      </APILoader>

      <ChargingMap />
    </div>
  );
}

export default MapWrapper;
