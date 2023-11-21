import { $api, headers } from "Components/http";

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
  static async getQr() {
    const params = {
      disabled: false,
      limit: 10,
      page: 0,
      sort_by: "created_at",
    };
    return $api.get(`qr/`, {
      params: params,
    });
  }
  static async createQr(id) {
    return $api.post(`qr/`, { product_id: id });
  }
  static async getQrById(id) {
    return $api.get(`/qr/${id}`, {
      // headers: headers,
      params: { eid: id },
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
          a: 255,
        },
        background_color: {
          r: 255,
          g: 255,
          b: 255,
          a: 255,
        },
      },
      {
        responseType: "blob",
        headers: headers,
      }
    );
  }
  static async getQrCheck(searchParams) {
    return $api.get(`qr/check`, {
      params: {
        eid: searchParams,
      },
    });
  }
  static async getProducts() {
    return $api.get(`product`, {
      params: {
        name: "",
        description: "",
        category: "",
        size: "",
        limit: "",
        page: "",
        sort_by: "",
      },
    });
  }
  static async fetchSaveProduct(qrData) {
    return $api.post(`product`, qrData);
  }
  static async disabledQr(id) {
    return $api.put(`product/${id}`, {});
  }
  static async deleteQr(id) {
    return $api.delete(`qr/${id}`)
  }
  // templates
  static async editTemplate(id, text) {
    return $api.put(`template/${id}`, { text: text });
  }
  static async createTemplate(text) {
    return $api.post(`template`, { text: text });
  }
  static async getTemplates() {
    return $api.get(`template`, {
      params: {
        limit: 10,
        page: 0
      }
    });
  }
  static async getTemplate(id) {
    return $api.get(`template/${id}`);
  }
  static async deleteTemplate(id) {
    return $api.delete(`template/${id}`);
  }
}
