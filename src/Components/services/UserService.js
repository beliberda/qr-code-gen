import { $api, headers } from "Components/http";

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
  static async getQr() {
    return $api.get(`/qr/`, {
      headers: headers,
      data: {
        disabled: false,
        limit: 50,
        page: 0,
        sort_by: "created_at",
      },
    });
  }
  static async getQrById(eid) {
    return $api.get(`/qr/${eid}`, {
      headers: headers,
      data: {
        disabled: false,
        limit: 50,
        page: 0,
        sort_by: "created_at",
      },
    });
  }
  static async getGeneratedQr(id) {
    return $api.post(
      `/qr/${id}`,
      {
        size: 500,
        foreground_color: {
          r: 0,
          g: 0,
          b: 0,
          a: 100,
        },
        background_color: {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        },
      },
      {
        responseType: "blob",
        headers: headers,
      }
    );
  }
  static async fetchSaveProduct(qrData) {
    return $api.post(`product`, qrData);
  }
}
