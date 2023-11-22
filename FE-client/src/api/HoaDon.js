import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const taoHoaDon = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/hoa_don/taoHoaDon`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
