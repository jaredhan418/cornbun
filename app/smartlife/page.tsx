import { Button } from '@radix-ui/themes';
import { unlockFrunk } from './action';

export default async function SmartLife() {
  const action = async (formData: FormData) => {
    'use server';
    await unlockFrunk();
  };

  return (
    <form action={action}>
      <input type='hidden' name='stub' />
      <Button type='submit'>解锁前备厢</Button>
    </form>
  );
}
