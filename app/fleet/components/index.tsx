import { APILoader, Provider } from '@uiw/react-baidu-map';
import BaiduMap from './BaiduMap';
import { BAIDU_AK_CLIENT } from '../../constants';
import FleetView from './FleetView';

function MapWrapper() {
  return (
    <div className='w-full h-full'>
      <APILoader akay={BAIDU_AK_CLIENT} type='webgl' version='3.0'>
        <Provider>
          <BaiduMap />
        </Provider>
      </APILoader>

      <FleetView />
    </div>
  );
}

export default MapWrapper;
