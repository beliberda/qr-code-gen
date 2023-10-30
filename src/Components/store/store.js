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
  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      // localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem(
        "token",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtYW5la2VuYnJhbmQtcXIiLCJleHAiOjE3MDEyNjU3MTMsImp0aSI6IjY1M2U0YTMwMTMwMTUxYzVhOGEzNzA2ZSIsImlhdCI6MTY5ODY3MzcxMywiaXNzIjoibWFuZWtlbmJyYW5kLXFyIiwibmJmIjoxNjk4NjczNzEzfQ.pkTtFwHp2nmUTvYxaEBqkEbEjUE2QKSAoxnmN76IWKckae-W07EX80ciyNUYtK4itRlu3VwL3aBf9q9bbWc5OmC6eDMSIUqJZk1wGmJprFs0HMjFSOLpVZpQqdAB-ln5EnKxvbWMz8FjoWVHbkHPXp4LWp_2BNXBax7NG125YbUf3EbGPgkt4Jdf3Dq93ICOSMZXDtcudXnOzLSkUS3G3vSMikhqUmnFgxHKHZvgS6C5JUaursmx0JMh2mwaUDl6OYsfzbPa1OwzwUYB5na6qjp3wv-xmLTINcWsLuGpaiQ7HlbPBCM4Imi4dJJ_Qb1sYy4FDifmtmUC3U6bdsLQ0CAMOnArLXRoP2wg7rItg3XkMotPyBfij4J5IFhxDlB1AyhT49elG1RQsgJI9nHOpbj2bsno3utOU8Js_7th0fTRQEndQ-JYQt_4DdTAMIecV85L22NgBXpjTKX8pgfabcRnD-_0diz_IOTcpRWxM7J0eX3VVzSwiQsTtBshINngDOQ5vD87u5Il8LZwcq_FfYxdoyUjDrQcTQmeiLgjEvv96Pu8iW8tGZSFWTfK98aJbtg0vWpr5jNON7cNPLY51YdojhAiALMP1tQ1hfE_mlg3elxg4iMSNowTVpuJ0MCOAeIhRu5UfTt63ON126jg9I5K3wEi5Vt-duOCSqTO3qg"
      );
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log("login", response);
    } catch (error) {
      console.log(error.response?.data?.message);
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
  // async checkAuth() {
  //   if (this) {

  //   }
  // }
  async getQr(id) {
    try {
      const response = await axios.get(`${API_URL}qr/${id}`);
      this.setProduct(response.data);
      return true;
    } catch (error) {
      console.log(error.response?.data?.message);
      return false;
    }
  }
}
