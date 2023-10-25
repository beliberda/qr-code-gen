import axios from "axios";
import { API_URL } from "Components/http";
import AuthService from "Components/services/AuthService";
import { makeAutoObservable } from "mobx";

export default class Store {
  user = {};
  isAuth = false;
  product = {};
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
      const response = await axios.get(`${API_URL}qr/${id}`, {
        withCredentials: true,
      });
      console.log("qr код ", response);
      this.setProduct(response.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
}
