'use client';

import { redirect } from 'next/navigation';
import { Button } from '@radix-ui/themes';

import { createOtk } from './action';

export default function SmartLife() {
  const createOtkAction = async (formData: FormData) => {
    try {
      const res = await createOtk();

      const link = `https://cornbun.fun/otk/${res}`;

      alert(link);
    } catch (e) {
      redirect('/');
    }
  };

  return (
    <div className='m-8'>
      <form action={createOtkAction}>
        <input type='hidden' name='stub' />
        <Button variant='soft' type='submit'>
          生成一次性授权链接
        </Button>
      </form>
    </div>
  );
}
