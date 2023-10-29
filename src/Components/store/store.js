import axios from "axios";
import { API_URL } from "Components/http";
import AuthService from "Components/services/AuthService";
import { makeAutoObservable } from "mobx";

export default class Store {
  user = {};
  isAuth = false;
  product = {
    name: null,
    size: null,
    color: null,
    material: null,
    category: null,
    photo: null,

  };
  // product = { "_id": "65046106121361691e6861de", "eid": "724aa8b572f5497baeb1904178abdd14db2d3ca8177e73cc03e4594406cc9ff1", "product_id": "65046106121361691e6861de", "product": { "_id": "61e02740f35754000750633d", "name": "KNITTED SWEATSHIRT ROCK", "description": "Very cool sweater!", "category": "sweaters", "color": "blue", "size": "OS", "materials": "50% cotton 50% acrylic", "photo": "https://thumb.tildacdn.com/stor3638-3335-4133-a438-303038353930/-/format/webp/68102468.png", "updated_at": "2023-10-25T20:19:14.7252096+10:00", "created_at": "2023-10-25T20:19:14.7252096+10:00" }, "first_used_at": "0001-01-01T00:00:00Z", "used_at": "0001-01-01T00:00:00Z", "updated_at": "2023-10-25T20:19:14.7252096+10:00", "created_at": "2023-10-25T20:19:14.7252096+10:00" };
  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }
  setProduct(product) {
    this.product = product;
  }
  async login(username, password) {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);

    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  async registration(username, password) {
    try {
      const response = await AuthService.registration(username, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}user/login`, {
        withCredentials: false,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  async getQr(id) {
    try {
      const response = await axios.get(`${API_URL}qr/${id}`);
      this.setProduct(response.data);
      return true
    } catch (error) {
      console.log(error.response?.data?.message);
      return false
    }
  }
}
