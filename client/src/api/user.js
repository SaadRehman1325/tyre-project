import { axiosClient } from "./axios";

export const checkLoggedIn = async () => {
  try {
    const response = await axiosClient.get(`/users/isLoggedIn`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axiosClient.post(`/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await axiosClient.post(`/users/logout`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getUser = async () => {
  try {
    const response = await axiosClient.get(`/users/admin`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async ({ username, password, email }) => {
  try {
    const response = await axiosClient.put(`/users/single`, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
