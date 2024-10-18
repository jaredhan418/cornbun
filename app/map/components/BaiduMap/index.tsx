import React, { useEffect, useMemo, useRef } from 'react';
import { useMap, useMapContext, useMarker } from '@uiw/react-baidu-map';
import * as styleJson from '../../config/style.json';
import { useAppStore } from '@/app/providers';

const mock_stations = [
  { lng: 116.48767, lat: 39.913959, data: { name: 'test1' } },
  { lng: 116.4839, lat: 39.914942, data: { name: 'test2' } },
  { lng: 116.48709, lat: 39.915929, data: { name: 'test3' } },
];

const BaiduMap = () => {
  const { map } = useMapContext();
  const containerRef = useRef(null);
  const { setContainer } = useMap({
    zoom: 18.5,
    center: { lat: 39.914949, lng: 116.48737 },
    enableScrollWheelZoom: true,
    enableInertialDragging: true,
    enableContinuousZoom: true,
  });

  const { view, setCurrentStation } = useAppStore(state => state);

  useEffect(() => {
    if (containerRef?.current) {
      setContainer(containerRef.current);
    }
  }, [containerRef?.current]);

  useEffect(() => {
    if (map) {
      map.setMapStyleV2({ styleJson });

      // const icon = new BMap.Icon('/images/location_icon.png', new BMap.Size(64, 64));
      // const point = new BMap.Point(116.48737, 39.914949);
      // const marker = new BMap.Marker(point, { icon });
      // map.addOverlay(marker);

      // (map as BMapGL.Map).start
      map.setTilt(45);

      addMarker('push-pin', { lng: 116.48737, lat: 39.914949 });

      mock_stations.forEach(station => {
        addMarker('charging_station', station);
      });
    }
  }, [map]);

  const addMarker = (name: string, data: any) => {
    const icon = new BMap.Icon(`/images/${name}.png`, new BMap.Size(48, 48));
    const point = new BMap.Point(data.lng, data.lat);
    const marker = new BMap.Marker(point, { icon });

    if (data?.data) {
      marker.addEventListener('click', () => clickEvent(data));
    }

    map.addOverlay(marker);
  };

  const clickEvent = (data: any) => {
    console.log(view, data.name);
    setCurrentStation(data);
  };

  return <div ref={containerRef} className='w-full h-full'></div>;
};

export default BaiduMap;
