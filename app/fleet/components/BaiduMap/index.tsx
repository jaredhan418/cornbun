import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMap, useMapContext, useMarker } from '@uiw/react-baidu-map';
import * as styleJson from '../../config/style.json';
import { useAppStore } from '@/app/providers';

const BaiduMap = (props: any) => {
  const { mapData } = props;

  const { map } = useMapContext();
  const containerRef = useRef(null);
  const { setContainer } = useMap({
    zoom: 18.5,
    center: { lat: 39.914949, lng: 116.48737 },
    enableScrollWheelZoom: true,
    enableInertialDragging: true,
    enableContinuousZoom: true,
  });

  const { setMap, hasTeam } = useAppStore(state => state);

  useEffect(() => {
    if (containerRef?.current) {
      setContainer(containerRef.current);
    }
  }, [containerRef?.current]);

  useEffect(() => {
    if (map) {
      setMap(map);

      map.setMapStyleV2({ styleJson });
      map.setTilt(45);

      addMarker('push-pin', { lng: 116.48737, lat: 39.914949 }, 48);
    }
  }, [map, hasTeam]);

  useEffect(() => {
    if (map && hasTeam) {
      mapData.forEach((owner: any) => {
        addMarker(`${owner.icon}_marker`, owner);
      });
    }
  }, [hasTeam, map, mapData]);

  const addMarker = (name: string, data: any, size = 64) => {
    const icon = new BMap.Icon(`/images/${name}.png`, new BMap.Size(size, size));
    const point = new BMap.Point(data.lng, data.lat);
    const marker = new BMap.Marker(point, { icon });

    map.addOverlay(marker);
  };

  return <div ref={containerRef} className='w-full h-full'></div>;
};

export default BaiduMap;
