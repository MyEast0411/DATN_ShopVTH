import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getAllSanPham = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-all-san-pham-enhanced`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getSPCTByIdSP = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getSanPhamIdSPCT/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getHinhAnhByIdSPCT = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getHinhAnhByIdSPCT/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSPCTbyId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getSPCTbyId/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const countAllSanPham = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/countAllSanPham`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllSanPhamChiTietByIdSanPham = async (idSP) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllSanPhamChiTietByIdSanPham/${idSP}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}