// src/apiConfig.js

const BASE_URL = 'http://localhost:8083';

const API_ENDPOINTS = {
    createUser: `${BASE_URL}/user/createUser`,
    getAllCountry: `${BASE_URL}/master/getAllCountry`,
    getStockItemsgetAllStates: `${BASE_URL}/master/getAllStates`,
    getAllCity: `${BASE_URL}/master/getAllCity`,

    getUsers: `${BASE_URL}/user/getUsers`,
    getStockItems: `${BASE_URL}/stock/getItemStock`,
    addStockList: `${BASE_URL}/stock/addStockList`,
    getBatchesFromItemId: `${BASE_URL}/stock/getBatchesFromItemId`,

    getAllItemStockList: `${BASE_URL}/stock/getAllItemStockList`,
    loginUser:`${BASE_URL}/user/loginUser`,

    saveBill:`${BASE_URL}/bill/createBill`,
    // Add more endpoints as needed
};

export { BASE_URL, API_ENDPOINTS };
