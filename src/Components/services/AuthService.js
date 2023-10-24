import $api from "Components/http";

export default class AuthService {
  static async login(username, password) {
    return $api.post("/login", { username, password });
  }
  static async logout(username, password) {
    return $api.post("/logout");
  }
}
