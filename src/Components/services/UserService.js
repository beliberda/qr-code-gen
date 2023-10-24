import $api from "Components/http";

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
}
