import { redirect } from 'next/navigation';

import { unlockFrunk, findVehicle } from './action';

export default async function SmartLife({ params }: { params: { key: string } }) {
  const { key } = params;

  const unlockAction = async (formData: FormData) => {
    'use server';
    try {
      await unlockFrunk(key);
    } catch (e) {
      redirect('/');
    }
  };

  const findAction = async (formData: FormData) => {
    'use server';
    try {
      await findVehicle(key);
    } catch (e) {
      redirect('/');
    }
  };

  return (
    <div>
      <form action={findAction}>
        <input type='hidden' name='stub' />
        <button className='bg-gray-200 h-10 w-48' type='submit'>
          寻找车辆
        </button>
      </form>
      <br />
      <form action={unlockAction}>
        <input type='hidden' name='stub' />
        <button className='bg-gray-200 h-10 w-48' type='submit'>
          解锁前备厢
        </button>
      </form>
    </div>
  );
}
