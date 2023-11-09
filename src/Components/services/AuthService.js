import { $api, headers } from "Components/http";

export default class AuthService {
  static async login(email, password) {
    return $api.post(
      "/user/login",
      { email, password },
      {
        headers: headers,
      }
    );
  }
  static async logout() {
    return $api.post("/logout");
  }
}
