import { axiosClient } from "./axios";

export const createProduct = async ({
  height,
  width,
  diameter,
  name,
  price,
  location,
  pattern,
  thread,
  type,
  loadIndex,
  speedRating,
  category,
  discount,
  tradeDepartment,
  description,
  brandId,
  showBrandLogo,
  productImages,
}) => {
  try {
    axiosClient.defaults.headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await axiosClient.post(`/products/create`, {
      createdAt: Date.now(),
      height,
      width,
      diameter,
      name,
      price,
      location,
      pattern,
      thread,
      type,
      loadIndex,
      speedRating,
      category,
      discount,
      tradeDepartment,
      description,
      brandId,
      showBrandLogo,
      productImages,
    });
    axiosClient.defaults.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get(`/products/all`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getSoldProducts = async () => {
  try {
    const response = await axiosClient.get(`/products/sold`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllBrands = async () => {
  try {
    const response = await axiosClient.get(`/products/brands/all`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getSingleProduct = async ({ productId }) => {
  try {
    const response = await axiosClient.get(`/products/single/${productId}`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async ({ productId }) => {
  try {
    const response = await axiosClient.delete(`/products/${productId}`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const filterProductsSearch = async ({ productsSearchQuery }) => {
  try {
    const response = await axiosClient.get(`/products/filter-products-search`, {
      params: productsSearchQuery,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async ({
  createdAt,
  productId,
  height,
  width,
  diameter,
  name,
  price,
  location,
  pattern,
  thread,
  type,
  loadIndex,
  speedRating,
  category,
  discount,
  tradeDepartment,
  description,
  brandId,
  showBrandLogo,
  productImages,
}) => {
  try {
    axiosClient.defaults.headers = {
      "Content-Type": "multipart/form-data",
    };

    const response = await axiosClient.put(`/products/${productId}`, {
      brandId,
      createdAt,
      height,
      width,
      diameter,
      name,
      price,
      location,
      pattern,
      thread,
      type,
      loadIndex,
      speedRating,
      category,
      discount,
      tradeDepartment,
      description,
      showBrandLogo,
      productImages,
    });
    axiosClient.defaults.headers = {
      "Content-Type": "application/json",
    };

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsDimensions = async ({ productsSearchQuery }) => {
  try {
    const response = await axiosClient.get(`/products/products-dimensions`, {
      params: productsSearchQuery,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
