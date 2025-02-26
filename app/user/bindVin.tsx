'use client';
import React from 'react';
import { RadioCards, Flex, Text, Button } from '@radix-ui/themes';

import './styles.css';

export function BindVin(props: { vehicles: any[]; bindVin: (vin: string) => Promise<any> }) {
  const { vehicles, bindVin } = props;

  const [vin, setVin] = React.useState<undefined | string>();

  const handleAction = async (formData: FormData) => {
    if (!vin) return;
    try {
      await bindVin(vin);

      alert('绑定成功');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className='flex flex-col justify-start'>
      <div className='text-2xl font-bold mb-4'>选择绑定车辆</div>
      <form className='mb-4' action={handleAction}>
        <RadioCards.Root>
          <Flex direction='column' gap='3' maxWidth='400px'>
            {vehicles.map((vehicle: any) => (
              <RadioCards.Item key={vehicle.vin} value={vehicle.vin} onClick={() => setVin(vehicle.vin)}>
                <Flex direction='column' width='100%'>
                  <Text weight='bold'>{vehicle.vin}</Text>
                  <Text>{vehicle.display_name}</Text>
                </Flex>
              </RadioCards.Item>
            ))}
          </Flex>
        </RadioCards.Root>
        <Button size='3' className='!mt-4' type='submit'>
          绑定
        </Button>
      </form>
    </div>
  );
}
