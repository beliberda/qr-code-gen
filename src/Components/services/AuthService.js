import $api from "Components/http";

export default class AuthService {
  static async login(username, password) {
    return $api.post(
      "/user/login",
      { username, password },
      {
        withCredentials: false,
      }
    );
  }
  static async logout(username, password) {
    return $api.post("/logout");
  }
  static async getQr(id) {
    return $api.get(`/qr/${id}`);
  }
}
