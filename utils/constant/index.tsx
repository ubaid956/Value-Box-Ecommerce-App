import axios from "axios";
const BASE_URL = "https://st8kmrv0-3000.inc1.devtunnels.ms/";

export const TOKEN_COOKIE = "expense-token";
export const USER_ID = "userId";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

Axios.interceptors.request.use(async (req) => {
  const token = await AsyncStorage.getItem(TOKEN_COOKIE);
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hYXJpakBnbWFpbC5jb20iLCJpZCI6IjY2YjBiZDAzOGRmMGM1OThiOTQ5MDBkMyIsImlhdCI6MTcyMjg1ODc1NX0.CNQRTaZSrjcHaONf6EFagrNU274dB4QWOhb-ui8-nUk";
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});
