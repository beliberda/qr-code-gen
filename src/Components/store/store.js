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
  authorization = null
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
  setAuthorization(authorization) {
    this.authorization = authorization
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      // debugger
      // localStorage.setItem("token", response.headers.getAuthorization);
      this.setAuthorization(response.headers.authorization)
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log("login", response);
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
