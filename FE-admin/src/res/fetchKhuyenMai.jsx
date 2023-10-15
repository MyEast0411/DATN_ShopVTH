<<<<<<< HEAD
import KhuyenMaiService from "../services/KhuyenMaiService.jsx";
=======
import KhuyenMaiService from "../services/KhuyenMaiService";
>>>>>>> db5103d8cb5a2f141421875eb766bc3587faa2ab

export const fetchKhuyenMai = async () => {
  try {
    const response = await KhuyenMaiService.getKhuyenMai();
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> db5103d8cb5a2f141421875eb766bc3587faa2ab
