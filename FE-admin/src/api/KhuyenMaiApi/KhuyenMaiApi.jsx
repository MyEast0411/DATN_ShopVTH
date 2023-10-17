import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; 

export const addKhuyenMai = async (khuyenMai) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/khuyen-mai/add`, khuyenMai);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getKhuyenMaiById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/khuyen-mai/find-khuyenMai-byId/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateKhuyenMai = async (id, khuyenMai) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/khuyen-mai/update/${id}`,
      khuyenMai
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};