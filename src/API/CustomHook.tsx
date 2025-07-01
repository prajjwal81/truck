import axios from 'axios';
import {useState} from 'react';
import {clearItem} from '../utils/asyncStorage';

export const BASE_URL = 'http://dev.itruck.com.sa/api/';
// export const BASE_URL = 'http://103.212.121.241/VentasAPI/public/index.php';

export const apiCall = async (
  endpoint,
  method = 'GET',
  params = {},
  token = '',
) => {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`[API CALL] ${method}: ${url}`, params);

  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && {Authorization: `Bearer ${token}`}),
    };

    const axiosConfig = {
      url,
      method: method.toUpperCase(),
      headers,
      ...(method.toUpperCase() === 'GET' ? {params} : {data: params}),
    };

    const response = await axios(axiosConfig);
    console.log(`[API RESPONSE] ${endpoint}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `[API ERROR] ${endpoint}:`,
      error?.response?.data || error.message,
    );
    return null;
  }
};

export const apiCall2 = async ({
  method = 'GET',
  endpoint,
  token = '',
  params = {},
}) => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    console.log('🚀 ~ url:', url, JSON.stringify(params, null, 2));
    const config = {
      method,
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token && {Authorization: `Bearer ${token}`}), // Adding Bearer prefix
      },
      ...(method === 'GET' ? {params} : {data: params}),
    };

    const response = await axios(config);

    // console.log(
    //   `🚀 ~ response.data:${endpoint}`,
    //   JSON.stringify(response.data, null, 2),
    // );

    return response.data;
  } catch (error) {
    console.error(
      `API Error:${endpoint}`,
      error.response?.data || error.message,
    );
    if (error.response?.data?.message == 'Unauthorized') {
      clearItem('auth');
    }
    return null; // Return null in case of error
  }
};

export const customApiCall = async (url, method, token, body = null) => {
  console.log(url, method, token, body);
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }
    // console.log(url, response.json());
    return await response.json();
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
};
