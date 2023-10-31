import $api, { headers } from "Components/http";

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
  static async getQrfromId(id) {
    return $api.get(`/qr/${id}`, {
      headers: headers,
      withCredentials: true,
    });
  }
}
