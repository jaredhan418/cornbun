import ky from 'ky';

export const fetchCommandApi = ky.create({
  prefixUrl: 'https://cornbun-proxy.vercel.app/api/',
  timeout: 200000,
});

export const fetchFleetCNApi = ky.create({
  prefixUrl: 'https://fleet-api.prd.cn.vn.cloud.tesla.cn/api/1/',
  timeout: 600000,
});

export const fetchApi = ky.create({
  // prefixUrl: 'https://cornbun.fun/api/',
  prefixUrl: 'http://localhost:3000/api/',
  timeout: 200000,
  hooks: {
    beforeError: [
      async err => {
        const { response } = err;
        switch (response.status) {
          case 401:
            err.message = 'Your connect is unauthorized, please logout and login again';
            break;
          case 403:
            err.message = 'Your access is forbidden.';
            break;
          case 408:
            err.message = (err as any).error;
            break;
          case 400:
          case 500: {
            const error = await err.response.json<any>();
            // log to next server for dev
            if (error.message) {
              err.message = error.message;
            }
          }
        }

        return err;
      },
    ],
  },
});
