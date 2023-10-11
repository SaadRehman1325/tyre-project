import { axiosClient } from "./axios";

export const createBrand = async ({ brandname, brandLogo }) => {
  try {
    axiosClient.defaults.headers = {
      "Content-Type": "multipart/form-data",
    };

    const response = await axiosClient.post(`/brand/`, {
      createdAt: Date.now(),
      brandname,
      brandLogo,
    });

    axiosClient.defaults.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllBrands = async () => {
  try {
    const response = await axiosClient.get(`/brand/`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getSingleBrand = async ({ brandId }) => {
  try {
    const response = await axiosClient.get(`/brand/single/${brandId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteBrand = async ({ brandId }) => {
  try {
    const response = await axiosClient.delete(`/brand/${brandId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateBrand = async ({
  brandId,
  createdAt,
  brandname,
  brandLogo,
}) => {
  try {
    axiosClient.defaults.headers = {
      "Content-Type": "multipart/form-data",
    };

    const response = await axiosClient.put(`/brand/${brandId}`, {
      createdAt,
      brandname,
      brandLogo,
    });

    axiosClient.defaults.headers = {
      "Content-Type": "application/json",
    };

    return response.data;
  } catch (err) {
    throw err;
  }
};
