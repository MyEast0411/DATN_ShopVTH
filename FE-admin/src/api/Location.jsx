import axios from "axios";

const host = "https://provinces.open-api.vn/api/";

export const getProvinces = () => {
  return axios.get(host + "?depth=1").then((response) => response.data);
};

export const getDistricts = (provinceCode) => {
  return axios
    .get(`${host}p/${provinceCode}?depth=2`)
    .then((response) => response.data.districts);
};

export const getWards = (districtCode) => {
  return axios
    .get(`${host}d/${districtCode}?depth=2`)
    .then((response) => response.data.wards);
};
