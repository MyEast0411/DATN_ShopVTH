import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const taoHoaDon = async () => {
    const response = await axios.post(`${API_BASE_URL}/hoa_don/taoHoaDon`);
    return response.data;
};

export const addToHoaDon = async (cartNotLoginDTO) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/hoa_don_chi_tiet/addHoaDonChiTietToHoaDon`,
            cartNotLoginDTO
        );
        return response.data;
    } catch (error) {
        console.error("Error adding to HoaDon:", error);
        throw error;
    }
};