import { APILoader, Provider } from '@uiw/react-baidu-map';
import BaiduMap from './BaiduMap';
import { BAIDU_AK_CLIENT } from '../../constants';
import ChargingMap from '@/app/charging/components/ChargingMap';

function MapWrapper() {
  return (
    <div className='w-full h-full'>
      <APILoader akay={BAIDU_AK_CLIENT} type='webgl' version='3.0'>
        <Provider>
          <BaiduMap />
        </Provider>
      </APILoader>

      <ChargingMap />
    </div>
  );
}

export default MapWrapper;
