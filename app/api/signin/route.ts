import { NextRequest } from 'next/server';

import { signIn } from '../../../auth';

export async function GET(req: NextRequest) {
  return await signIn('tesla-auth');
}
