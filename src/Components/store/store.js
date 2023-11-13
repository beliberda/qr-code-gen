
import AuthService from "Components/services/AuthService";

import { makeAutoObservable } from "mobx";

export default class Store {
  isModal = false;
  templates = []

  user = {};
  isAuth = false;
  product = {
    name: null || "",
    description: null || "",
    size: null || "",
    category: null || "",
    url: null || "",
    photo: null || [],
    updated_at: null || "",
    _id: null || "",
    color: null || "",
    created_at: null || "",
    materials: null || "",
  };
  authorization = null
  constructor() {
    makeAutoObservable(this);
  }
  setModal() {
    this.isModal = this.isModal ? false : true
    console.log(this.isModal);
  }
  setTemplates(templates) {
    this.templates = templates
  }
  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }
  setProduct(product) {
    this.product = product;
    console.log("product", JSON.parse(JSON.stringify(this.product)));
  }
  setAuthorization(authorization) {
    this.authorization = authorization
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.headers.authorization);
      this.setAuthorization(response.headers.authorization)
      this.setAuth(true);
      this.setUser(response.data.user);
      // console.log("login", response);
    } catch (error) {
      console.log(error);
    }
  }
  async registration(email, password) {
    try {
      const response = await AuthService.registration(email, password);
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
    if (this.isAuth) {
      return;
    }
  }
}
