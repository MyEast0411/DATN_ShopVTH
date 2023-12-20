import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getAllSanPham = async () => {
    const response = await axios.get(`${API_BASE_URL}/get-all-san-pham-enhanced`);
    return response.data;
}

export const getSanPhamChiTietByDefaultImg = async (urlImg) => {
    const response = await axios.post(
        `${API_BASE_URL}/getSanPhamChiTietByDefaultImg`,
        { urlImg }, // Pass the urlImg as an object
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;

};

export const getSanPhamChiTietByMaListSPCT = async (maList) => {
    const response = await axios.get(`${API_BASE_URL}/getSanPhamChiTietByMaListSPCT/${maList.join(',')}`);
    return response.data;
};


export const getAllHA = async () => {
    const response = await axios.get(`${API_BASE_URL}/getAllHA`);
    return response.data;
}


export const getAllSanPhamChiTietByIdList = async (idList) => {
    const response = await axios.get(`${API_BASE_URL}/getAllSanPhamChiTietByIdList`, {
        params: { idList: idList.join(',') },
    });
    return response.data;
};

export const getSPCTByIdSP = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/getSanPhamIdSPCT/${id}`);
    return response.data;
}

export const getHinhAnhByIdSPCT = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/getHinhAnhByIdSPCT/${id}`);
    return response.data;
}

export const getSPCTbyId = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/getSPCTbyId/${id}`);
    return response.data;
}

export const countAllSanPham = async () => {
    const response = await axios.get(`${API_BASE_URL}/countAllSanPham`);
    return response.data;
}

export const getAllSanPhamChiTietByIdSanPham = async (idSP) => {
    const response = await axios.get(`${API_BASE_URL}/getAllSanPhamChiTietByIdSanPham/${idSP}`);
    return response.data;
}