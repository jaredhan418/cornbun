"use server";

import ky from "ky";

export const fetchCommandApi = ky.create({
  prefixUrl: "https://cornbun-proxy.vercel.app/api/",
  timeout: 600000,
});

export const fetchFleetCNApi = ky.create({
  prefixUrl: "https://fleet-api.prd.cn.vn.cloud.tesla.cn/api/1/",
  timeout: 600000,
});