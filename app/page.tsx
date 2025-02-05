import Link from 'next/link';

import { auth } from '@/auth';
import { Header } from './_components/header';

export default async function Index() {
  const session = await auth();

  const userName = session?.user?.name;

  return (
    <div className='relative w-full h-full'>
      <div className='absolute top-4 left-4 text-3xl font-bold flex'>
        <img src='/images/logo.svg' className='w-7 mr-2' />
        <span className=''>Road</span>
        <span className='text-gray-500'>Link</span>
      </div>
      <Header userName={userName} />
      <div className='flex justify-center items-center w-full h-full'>
        <div className='border-8 h-96 border-gray-700 p-2 relative flex items-center justify-center mx-6'>
          <div className='absolute flex flex-col gap-y-1 left-2 top-2'>
            {[1, 2, 3].map(val => (
              <div key={val} className='bg-black w-3 h-3'></div>
            ))}
          </div>
          <div className='absolute flex flex-col gap-y-1 right-2 bottom-2'>
            {[1, 2, 3].map(val => (
              <div key={val} className='bg-black w-3 h-3'></div>
            ))}
          </div>
          <Link href='/charging' className='block mx-5'>
            <div className='font-bold text-3xl'>充电-Charging</div>
            <div className='w-full h-1 bg-gray-500'></div>
            <div className='italic font-light'>Find a Charging Station</div>
          </Link>
        </div>
        <div className='border-8 h-96 border-gray-700 p-2 relative flex items-center justify-center mx-6'>
          <div className='absolute flex flex-col gap-y-1 left-2 top-2'>
            {[1, 2, 3].map(val => (
              <div key={val} className='bg-black w-3 h-3'></div>
            ))}
          </div>
          <div className='absolute flex flex-col gap-y-1 right-2 bottom-2'>
            {[1, 2, 3].map(val => (
              <div key={val} className='bg-black w-3 h-3'></div>
            ))}
          </div>
          <Link href='/fleet' className='block mx-5'>
            <div className='font-bold text-3xl'>车队-Fleet</div>
            <div className='w-full h-1 bg-gray-500'></div>
            <div className='italic font-light'>Connect with Your Team</div>
          </Link>
        </div>
        <div className='border-8 h-96 border-gray-700 p-2 relative flex items-center justify-center mx-6'>
          <div className='absolute flex flex-col gap-y-1 left-2 top-2'>
            {[1, 2, 3].map(val => (
              <div key={val} className='bg-black w-3 h-3'></div>
            ))}
          </div>
          <div className='absolute flex flex-col gap-y-1 right-2 bottom-2'>
            {[1, 2, 3].map(val => (
              <div key={val} className='bg-black w-3 h-3'></div>
            ))}
          </div>
          <Link href='/smartlife' className='block mx-5'>
            <div className='font-bold text-3xl'>生活-Life Style</div>
            <div className='w-full h-1 bg-gray-500'></div>
            <div className='italic font-light'>Use Tesla Improve Your Life</div>
          </Link>
        </div>
        <div className='flex gap-x-1 left-2 top-2 mx-6'>
          {[1, 2, 3].map(val => (
            <div key={val} className='bg-black w-3 h-3'></div>
          ))}
        </div>
      </div>
      <div className='absolute bottom-4 right-4 text-2xl font-bold flex'>
        <span className=''>Connection&nbsp;</span>
        <span className='text-gray-500'>Is All You Need</span>
      </div>
    </div>
  );
}
