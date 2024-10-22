import { useAppStore } from '@/app/providers';
import { CoffeeOutlined, HeartFilled, HeartOutlined, PhoneFilled, ShopOutlined, ShoppingOutlined, ThunderboltFilled } from '@ant-design/icons';
import { Alert, Button, Divider, Drawer, message, Tag } from 'antd';
import React, { useState } from 'react';
import { isCurrentTime } from '@/app/utils';
import { fetchApi } from '@/app/serviceUtil';

function CharginDetails() {
  const { currentStation, setCurrentStation, map } = useAppStore(s => s);
  const data = currentStation?.data;
  const [fav, setIsFav] = useState<boolean>(false);

  const onClose = () => {
    map.removeOverlay(currentStation.marker);
    setCurrentStation(null);
  };

  const onNavigation = async () => {
    if (currentStation?.data) {
      const body = {
        lat: data.lat,
        lon: data.lng,
        order: 1,
      };

      const arr = await fetchApi.post(`fleet/navigationGPSRequest`, {
        json: body,
      });

      message.success('已成功推送到车机端!');
    }
  };

  return (
    <Drawer onClose={onClose} open={currentStation !== null} mask={false}>
      {currentStation !== null && (
        <div>
          <div className='text-2xl font-medium text-gray-700'>{data?.name}</div>
          <div className='italic my-4 text-gray-500 !flex justify-between items-center'>
            {data.address}{' '}
            <div className='text-sm !flex justify-start items-center'>
              <img src='/images/navigator.svg' className='w-4 mr-px rotate-45 origin-center -translate-y-px' />
              <div className='text-sm' style={{ fontSize: '12px' }}>
                0.4km
              </div>
            </div>
          </div>
          <div className='my-3 flex items-center justify-between'>
            <div className='flex items-center'>
              <Button
                size='large'
                className='text-3xl mr-5'
                shape='circle'
                icon={fav ? <HeartFilled /> : <HeartOutlined />}
                onClick={() => setIsFav(!fav)}
              />
              <Button size='large' className='text-3xl' shape='circle' icon={<PhoneFilled />} onClick={() => setIsFav(!fav)} />
            </div>

            <Button
              size='large'
              className='!rounded w-60'
              style={{ backgroundColor: '#3e6ae1' }}
              type='primary'
              icon={<ThunderboltFilled />}
              onClick={onNavigation}
            >
              去充电
            </Button>
          </div>
          <Divider />
          <Alert
            message={
              <>
                <span className='font-normal'>当前充电桩可用情况: {data.status.available === data.status.total ? '已满' : '空闲'} </span>
                <span className='text-lg'>
                  <span>{data.status.available}</span> / {data.status.total}
                </span>
              </>
            }
            type={data.status.available === data.status.total ? 'error' : 'success'}
          />

          <div className='mt-6 mb-2 text-lg'>收费详情</div>
          <div className='p-2 flex items-center'>
            <div style={{ width: '100px' }}>充电时段</div>
            <div style={{ width: '90px' }}>价格（元/度）</div>
            <div style={{ width: '40px', paddingLeft: '10px' }}>=</div>
            <div style={{ width: '50px' }}>电费</div>
            <div style={{ width: '40px' }}>+</div>
            <div style={{ width: '50px' }}>服务费</div>
          </div>
          {data.priceDetails.map((p: any, i: any) => {
            const isCurrent = isCurrentTime(p.startTime, p.endTime);
            return (
              <div key={i} className={`mb-3 relative rounded p-2 flex items-center ${isCurrent ? 'bg-gray-200' : 'bg-gray-100'}`}>
                <div style={{ width: '100px' }}>
                  {p.startTime}-{p.endTime}
                </div>
                <div style={{ width: '90px' }}>{(p?.electricityFee + p?.serviceFee).toFixed(2)}</div>
                <div style={{ width: '40px' }}></div>
                <div style={{ width: '50px' }}>{(p?.electricityFee).toFixed(2)}</div>
                <div style={{ width: '40px' }}></div>
                <div style={{ width: '50px' }}>{(p?.serviceFee).toFixed(2)}</div>

                {isCurrent && (
                  <div className='absolute -right-3 -top-2'>
                    <Tag color='#3e6ae1'>当前时段</Tag>
                  </div>
                )}
              </div>
            );
          })}
          <div className='mt-6 mb-3 text-lg'>服务设施</div>
          <div className='text-3xl text-gray-600 flex gap-x-6'>
            <ShoppingOutlined />
            <ShopOutlined />
            <CoffeeOutlined />
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default CharginDetails;
