import { $api, headers } from "Components/http";

const params = { disabled: false }

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
  static async getQr() {
    return $api.get(`qr/`, {
      data: {
        disabled: true
      }
    });
  }
  static async getQrById(eid) {
    return $api.get(`/qr/${eid}`, {
      headers: headers,
      data: {
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
  static async getQrCheck(searchParams) {
    return $api.post(
      `qr/check/`,
      {
        eid: searchParams.get("eid"),
      })
  }
  static async fetchSaveProduct(qrData) {
    return $api.post(`product`, qrData);
  }
}
