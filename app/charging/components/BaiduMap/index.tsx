import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMap, useMapContext, useMarker } from '@uiw/react-baidu-map';
import * as styleJson from '../../config/style.json';
import { useAppStore } from '@/app/providers';
import mock_stations from '@/app/mocks/charging_stations.json';

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

  const [clickData, setClickData] = useState<any>();

  const { view, setCurrentStation, currentStation, setMap } = useAppStore(state => state);

  useEffect(() => {
    if (containerRef?.current) {
      setContainer(containerRef.current);
    }
  }, [containerRef?.current]);

  useEffect(() => {
    if (clickData?.id === currentStation?.data?.id) return;

    if (currentStation?.marker) {
      map.removeOverlay(currentStation?.marker);
    }

    const icon = new BMap.Icon(`/images/${clickData.type}_marker.png`, new BMap.Size(56, 56));
    const point = new BMap.Point(clickData.lng, clickData.lat);
    const marker = new BMap.Marker(point, { icon });
    map.addOverlay(marker);

    setCurrentStation({ data: clickData, marker });
  }, [clickData]);

  useEffect(() => {
    if (map) {
      setMap(map);

      map.setMapStyleV2({ styleJson });
      map.setTilt(45);

      addMarker('push-pin', { lng: 116.48737, lat: 39.914949 }, 48);

      mock_stations.forEach(station => {
        addMarker(station.type, station);
      });
    }
  }, [map]);

  const addMarker = (name: string, data: any, size = 32) => {
    const icon = new BMap.Icon(`/images/${name}.png`, new BMap.Size(size, size));
    const point = new BMap.Point(data.lng, data.lat);
    const marker = new BMap.Marker(point, { icon });

    if (data?.id) {
      marker.addEventListener('click', () => clickEvent(data));
    }

    map.addOverlay(marker);
  };

  const clickEvent = (data: any) => setClickData(JSON.parse(JSON.stringify(data)));

  return <div ref={containerRef} className='w-full h-full'></div>;
};

export default BaiduMap;
