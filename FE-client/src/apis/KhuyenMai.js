import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
// Get all khuyen mai san pham chi tiet
export const getAllKMSPCT = async () => {
    const response = await axios.get(`${API_BASE_URL}/khuyen-mai/getAllKMSPCT`);
    return response.data;
};