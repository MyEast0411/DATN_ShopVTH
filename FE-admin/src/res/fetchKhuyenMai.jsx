import KhuyenMaiService from "../services/KhuyenMaiService";

export const fetchKhuyenMai = async () => {
  try {
    const response = await KhuyenMaiService.getKhuyenMai();
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
