"use client"

import { Button } from '@radix-ui/themes';
import { redirect } from 'next/navigation';

import { unlockFrunk, findVehicle, createOtk } from './action';

export default function SmartLife() {
  const unlockAction = async (formData: FormData) => {
    try {
      await unlockFrunk();
    } catch (e) {
      redirect("/")
    }
  };

  const findAction = async (formData: FormData) => {
    try {
      await findVehicle();
    } catch (e) {
      redirect("/")
    }
  };

  const createOtkAction = async (formData: FormData) => {
    try {
      const res = await createOtk();

      alert(res);
    } catch (e) {
      redirect("/")
    }
  };

  return (
    <div>
      <form action={createOtkAction}>
        <input type='hidden' name='stub' />
        <Button type='submit'>生成一次性授权链接</Button>
      </form>
      <form action={findAction}>
        <input type='hidden' name='stub' />
        <Button type='submit'>寻找车辆</Button>
      </form>
      <form action={unlockAction}>
        <input type='hidden' name='stub' />
        <Button type='submit'>解锁前备厢</Button>
      </form>
    </div>

  );
}
