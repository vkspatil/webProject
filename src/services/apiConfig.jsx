// src/apiConfig.js

const BASE_URL = "http://172.20.10.6:8083";

const API_ENDPOINTS = {
  createUser: `${BASE_URL}/user/createUser`,//post
  getAllCountry: `${BASE_URL}/master/getAllCountry`,//g
  getStockItemsgetAllStates: `${BASE_URL}/master/getAllStates`,//g
  getAllCity: `${BASE_URL}/master/getAllCity`,//g

  getUsers: `${BASE_URL}/user/getUsers`,//g
  getStockItems: `${BASE_URL}/stock/getItemStock`,//g
  addStockList: `${BASE_URL}/stock/addStockList`,//g
  getBatchesFromItemId: `${BASE_URL}/stock/getBatchesFromItemId`,//g

  getAllItemStockList: `${BASE_URL}/stock/getAllItemStockList`,//g
  loginUser: `${BASE_URL}/user/loginUser`,//p

  saveBill: `${BASE_URL}/bill/createBill`,//p
  // Add more endpoints as needed
};

export { BASE_URL, API_ENDPOINTS };

// import axiosInstance from "../http_configue";

// export const createUsers = (finalObj) => {
//   return axiosInstance.post(`/user/createUser`, finalObj, {
//     headers: authHeader(),
//   });
// };

// export const getAllCountry = () => {
//   return axiosInstance.get(`/master/getAllCountry`, {
//     headers: authHeader(),
//   });
// };

// export const getAllStates = () => {
//   return axiosInstance.get(`/master/getAllStates`, {
//     headers: authHeader(),
//   });
// };
// export const getAllCity = () => {
//   return axiosInstance.get(`/master/getAllCity`, {
//     headers: authHeader(),
//   });
// };
// export const getUsers = () => {
//   return axiosInstance.get(`/user/getUsers`, {
//     headers: authHeader(),
//   });
// };
// export const getItemStock = () => {
//   return axiosInstance.get(`/stock/getItemStock`, {
//     headers: authHeader(),
//   });
// };
// export const addStockList = () => {
//   return axiosInstance.get(`stock/addStockList`, {
//     headers: authHeader(),
//   });
// };
// export const getBatchesFromItemId = () => {
//   return axiosInstance.get(`/stock/getBatchesFromItemId`, {
//     headers: authHeader(),
//   });
// };
// export const getAllItemStockList = () => {
//   return axiosInstance.get(`/stock/getAllItemStockList`, {
//     headers: authHeader(),
//   });
// };
// export const loginUser = () => {
//   return axiosInstance.get(`/user/loginUser`, {
//     headers: authHeader(),
//   });
// };
// export const createBill = () => {
//   return axiosInstance.get(`/bill/createBill`, {
//     headers: authHeader(),
//   });
// };
