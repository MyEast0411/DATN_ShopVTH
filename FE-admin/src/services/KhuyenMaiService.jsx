import axios from "axios";

const KHUYENMAI_REST_API_URL =
  "http://localhost:8080/khuyen-mai";

class KhuyenMaiService {
  getKhuyenMai() {
    return axios.get(KHUYENMAI_REST_API_URL);
  }

}

export default new KhuyenMaiService();