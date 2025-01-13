'use client';

import { redirect } from 'next/navigation';

import { unlockFrunk, findVehicle, createOtk } from './action';
import './styles.css';

export default function SmartLife() {
  const unlockAction = async (formData: FormData) => {
    try {
      await unlockFrunk();
    } catch (e) {
      redirect('/');
    }
  };

  const findAction = async (formData: FormData) => {
    try {
      await findVehicle();
    } catch (e) {
      redirect('/');
    }
  };

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
    <div className='m-auto'>
      <form action={createOtkAction}>
        <input type='hidden' name='stub' />
        <button className='bg-gray-200 h-10 w-48' type='submit'>
          生成一次性授权链接
        </button>
      </form>
    </div>
  );
}
