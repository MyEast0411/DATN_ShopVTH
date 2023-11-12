import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// Get all khuyen mai
export const getAllKhuyenMai = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/khuyen-mai`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all khuyen mai san pham chi tiet
export const getAllKMSPCT = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/khuyen-mai/getAllKMSPCT`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// add
export const addKhuyenMai = async (khuyenMai, selectedMaCTSP) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/khuyen-mai/add/${selectedMaCTSP}`,
      khuyenMai
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// searchByDate
export const searchByDate = async (ngayBatDau, ngayKetThuc) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/khuyen-mai/searchByDate/${ngayBatDau}/${ngayKetThuc}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get by id
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

// update
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

// soft  delete
export const deleteKhuyenMai = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/khuyen-mai/soft-delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findKmspctByKhuyenMaiId = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/khuyen-mai/findKMSPCT-by-khuyenMaiId/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
