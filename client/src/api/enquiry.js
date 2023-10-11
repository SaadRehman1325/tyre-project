import { axiosClient } from "./axios";

export const createEnquiry = async (data) => {
  try {
    const response = await axiosClient.post(`/enquiries`, { data });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getEnquiries = async () => {
  try {
    const response = await axiosClient.get(`/enquiries`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getSingleEnquiry = async ({ enquiryId }) => {
  try {
    const response = await axiosClient.get(`/enquiries/single/${enquiryId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteEnquiry = async ({ enquiryId }) => {
  try {
    const response = await axiosClient.delete(`/enquiries/single/${enquiryId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateEnquiryStatus = async ({ enquiryId }) => {
  try {
    const response = await axiosClient.put(`/enquiries/status/${enquiryId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
