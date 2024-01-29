import axios from "axios";

const host = "https://vapi.vnappmob.com/api/province";

export const getProvinces = async () => {
  const response = await axios.get(`${host}/`);
  return response.data;
};

export const getDistricts = async (province_id) => {
  const response = await axios.get(`${host}/district/${province_id}`);
  return response.data;
};

export const getWards = async (district_id) => {
  const response = await axios.get(`${host}/ward/${district_id}`);
  return response.data;
};
