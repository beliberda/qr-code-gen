import { $api, headers } from "Components/http";



export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
  static async getQr() {
    const params = {
      disabled: false,
      limit: 50,
      page: 0,
      sort_by: 'created_at',
    }
    return $api.get(`qr/`, {
      params: params
    });
  }
  static async getQrById(eid) {
    return $api.get(`/qr/${eid}`, {
      headers: headers,
      params: { eid: eid }
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
  static async getQrCheck(searchParams) {
    return $api.get(
      `qr/check`,
      {
        params: {
          "eid": "1224",
        },
      })
  }
  static async fetchSaveProduct(qrData) {
    return $api.post(`product`, qrData);
  }
}
