'use server';

import { fetchApi } from '@/app/serviceUtil';

export default async function CreateFleet() {
  const createFleet = async (formData: FormData) => {
    'use server';

    const json = {
      groupName: formData.get('groupName'),
      groupCode: formData.get('groupCode'),
    };

    await fetchApi.post('fleet/createGroup', {
      json,
    });

    alert('创建成功');
  };

  return (
    <form action={createFleet}>
      <label>车队名称</label>
      <input className='bg-slate-400' name='groupName'></input>
      <label>车队code</label>
      <input name='groupCode' className='bg-slate-400' type='number' maxLength={6}></input>

      <button type='submit'>提交</button>
    </form>
  );
}
