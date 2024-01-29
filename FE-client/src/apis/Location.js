import axios from "axios";

const host = "https://provinces.open-api.vn/api/";

export const getProvinces = async () => {
  const response = await axios.get(`${host}?depth=1`);
  return response.data;
};

export const getDistricts = async (provinceCode) => {
  const response = await axios.get(`${host}p/${provinceCode}?depth=2`);
  return response.data.districts;
};

export const getWards = async (districtCode) => {
  const response = await axios.get(`${host}d/${districtCode}?depth=2`);
  return response.data.wards;
};
