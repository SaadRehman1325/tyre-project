import { axiosClient } from "./axios";

export const getContactInfo = async () => {
  try {
    const response = await axiosClient.get(`/contact/`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAddress = async () => {
  try {
    const response = await axiosClient.get(`/contact/address`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateContactInfo = async ({
  emailAddress,
  phoneNumber,
  address,
  facebookLink,
  youtubeLink,
  instagramLink,
}) => {
  try {
    const response = await axiosClient.put(`/contact/`, {
      emailAddress,
      phoneNumber,
      address,
      facebookLink,
      youtubeLink,
      instagramLink,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
