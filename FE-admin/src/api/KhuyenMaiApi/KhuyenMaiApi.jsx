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

