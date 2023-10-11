import { axiosClient } from "./axios";

export const createOrder = async (data) => {
  try {
    const response = await axiosClient.post(`/orders`, { data });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosClient.get(`/orders`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getSingleOrder = async ({ orderId }) => {
  try {
    const response = await axiosClient.get(`/orders/single/${orderId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteOrder = async ({ orderId }) => {
  try {
    const response = await axiosClient.delete(`/orders/single/${orderId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateStatus = async ({ orderId }) => {
  try {
    const response = await axiosClient.put(`/orders/status/${orderId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
