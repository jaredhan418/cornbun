import { useAppStore } from '@/app/providers';
import { CheckCircleFilled, CloseCircleFilled, CloseSquareFilled, ExclamationCircleFilled, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Collapse, CollapseProps, Divider, GetProps, Image, Input, Modal, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import mock_data from '@/app/mocks/fleet.json';
import _ from 'lodash';
import { BMSuggestion } from '@/app/interfaces';
import { fetchApi } from '@/app/serviceUtil';

import { addGroup } from '../action';

type OTPProps = GetProps<typeof Input.OTP>;

function FleetView() {
  const router = useRouter();
  const { hasTeam, setHasTeam, map } = useAppStore(s => s);
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [applyLoading, setApplyLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<BMSuggestion[]>([]);
  const [location, setLocation] = useState<BMSuggestion>();
  const [groupName, setGroupName] = useState('');

  const onSearch = async (e: any) => {
    const term = e.target.value;
    searchDebounce(term);
  };

  const searchDebounce = useCallback(
    _.debounce(async (_term: string) => {
      const term = _term.trim();
      if (term?.length <= 0) {
        setSuggestions([]);
        return;
      }

      const arr = (await (await fetch(`/api/map?query=${term}&region=全国&output=json`)).json())?.result;
      setSuggestions(arr);
    }, 500),
    []
  );

  const onChange: OTPProps['onChange'] = async text => {
    setCode(text);
    if (text.length === 6) {
      setLoading(true);

      try {
        const group: any = await addGroup(text);

        setLoading(false);
        setIsFound(true);
        setGroupName(group.groupName);
      } catch (e) {
        setLoading(false);
        setIsFound(false);

        alert('加入失败');
      }

      // setTimeout(() => {
      //   setLoading(false);
      //   setIsFound(true);
      // }, 2000);
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const onNavigation = async () => {
    if (location) {
      const body = {
        lat: location.location.lat,
        lon: location.location.lng,
        order: 1,
      };

      const searchParams = new URLSearchParams();
      searchParams.append('vin', 'LRW3E7ET0RC214201');

      const arr = await fetchApi.post(`fleet/navigationGPSRequest`, {
        searchParams,
        json: body,
      });

      console.log(arr);
    }
  };

  return (
    <>
      <div className='absolute top-8 left-8 flex' style={{ zIndex: 1000 }}>
        <Button className='!h-12 !rounded mr-3 !border-none !shadow-md' onClick={() => router.push('/')}>
          <LeftOutlined />
        </Button>
        {hasTeam &&
          (location ? (
            <div>
              <div className='shadow-md bg-white rounded py-4 px-6 max-w-96 w-96 mb-4'>
                <div className='text-gray-600 text-sm font-bold mb-2'>目的地：</div>
                <div className='text-2xl font-medium flex items-center mb-2'>
                  <img className='w-6 mr-2' src='/images/location_icon.png' alt='location icon' />
                  {location.name}
                </div>
                <div className='italic text-gray-600 text-sm mb-4 flex justify-between'>
                  {location.address}
                  <div className='flex items-center justify-end'>
                    <img src='/images/navigator.svg' className='w-4 mr-px rotate-45 origin-center -translate-y-px' />
                    0.4km
                  </div>
                </div>
                <Button size='large' className='!rounded w-60' style={{ backgroundColor: '#3e6ae1' }} type='primary' onClick={onNavigation}>
                  去导航
                </Button>
              </div>
              {/* <div className='shadow-md bg-white rounded py-4 px-6 max-w-96 w-96'> */}
              <MessageList />
              {/* </div> */}
            </div>
          ) : (
            <div className='shadow-md'>
              <div id='charging-input' className='left-5 !w-96 z-1'>
                <input
                  className={`w-full ${suggestions?.length ? 'rounded-t border-b' : 'rounded'} h-12 px-8 outline-none`}
                  placeholder='查找目的地'
                  onChange={onSearch}
                />
                {suggestions?.length > 0 && (
                  <div className='bg-white rounded-b px-4'>
                    {suggestions.map((s, i) => (
                      <div
                        className={'flex items-center justify-start px-2 py-4' + (i !== suggestions.length - 1 ? ' border-b' : '')}
                        key={s.uid || _.uniqueId()}
                        onClick={() => {
                          setLocation(s);
                        }}
                      >
                        <img className='w-6 mr-2' src='/images/location_icon.png' alt='location icon' />
                        {s.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {hasTeam && (
        <>
          <div className='absolute top-8 right-8 flex flex-col justify-center' style={{ zIndex: 1000 }}>
            {mock_data.map(data => (
              <div
                key={data.id}
                className='w-30 flex flex-col mb-3 items-center justify-start !rounded py-2 px-4 !border-none !shadow-md bg-white'
                onClick={() => {
                  const point = new BMap.Point(data.lng, data.lat);
                  map.panTo(point);

                  setTimeout(() => {
                    map.setTilt(45);
                  }, 300);
                }}
              >
                <Image preview={false} src={`/images/${data.icon}.png`} width={48} height={48} />
                <div className='pt-2 text-gray-700 font-medium'>{data.name}</div>
                <div className='text-sm !flex justify-start items-center'>
                  <img src='/images/navigator.svg' className='w-4 mr-px rotate-45 origin-center -translate-y-px' />
                  <div className='text-sm' style={{ fontSize: '12px' }}>
                    {data.distance}km
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='absolute bottom-20 w-full flex justify-center' style={{ zIndex: 1000 }}>
            <div className='!shadow-md bg-white flex justify-center items-center h-18'>
              <div className='flex justify-center items-center pl-8 pr-4 py-4 rounded-1' onClick={() => {}}>
                <div className='flex justify-center items-center rounded h-10 py-1' onClick={() => {}}>
                  <img src='/images/mic.svg' className='w-10' />
                </div>
              </div>
              <Divider type='vertical' />
              <div className='flex justify-center items-center pl-4 pr-8 py-4'>
                <div className='flex justify-center items-center rounded' onClick={() => {}}>
                  <CloseSquareFilled className='text-5xl' style={{ color: '#ed4e3b' }} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Modal className='rounded' title={null} centered open={!hasTeam} closable={false} footer={null}>
        <div className='p-2'>
          <div className='my-3 text-xl font-medium'>
            <ExclamationCircleFilled className='mr-2' style={{ color: '#3e6ae1' }} />
            您尚未在车队中，请创建或加入车队
          </div>
          <div className='italic text-sm text-gray-500'>通过输入6位密码来创建或申请加入一个已经存在的车队</div>
          <div className='my-6 flex justify-center items-center'>
            <Input.OTP formatter={str => str.toUpperCase()} variant='filled' {...sharedProps} />
          </div>
          {loading && <Spin className='w-full !my-3' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
          {isFound && (
            <div className='flex flex-col justify-center items-center'>
              <div className='mb-5 text-lg flex'>
                <div className='text-gray-600 flex items-end'>确认申请加入：</div>
                <div className='font-bold text-3xl italic'>{groupName}</div>
              </div>
              {!applyLoading ? (
                <div className='flex gap-x-8'>
                  <CheckCircleFilled
                    className='text-5xl'
                    style={{ color: '#02b028' }}
                    onClick={() => {
                      setApplyLoading(true);

                      setTimeout(() => {
                        setApplyLoading(false);
                        setHasTeam(true);
                      }, 1500);
                    }}
                  />
                  <CloseCircleFilled className='text-5xl' style={{ color: '#ed4e3b' }} />
                </div>
              ) : (
                <Spin className='w-full !my-3' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default FleetView;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: '快捷消息列表',
    children: (
      <div className='flex justify-start items-start'>
        {['下个服务区大家休息！'].map(str => (
          <div key={str}>{str}</div>
        ))}
      </div>
    ),
  },
];

const MessageList: React.FC = () => <Collapse defaultActiveKey={['1']} ghost items={items} />;
