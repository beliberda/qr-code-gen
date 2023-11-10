import axios from "axios";

// export const API_URL = " http://127.0.0.1:8225/";
// export const API_URL = "https://solweb.site/";
// export const API_URL = "http://86.102.143.87:8225/";
export const API_URL = "http://188.226.76.178:8225/";

const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

const Auth =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtYW5la2VuYnJhbmQtcXIiLCJleHAiOjE3MDEyNjU3MTMsImp0aSI6IjY1M2U0YTMwMTMwMTUxYzVhOGEzNzA2ZSIsImlhdCI6MTY5ODY3MzcxMywiaXNzIjoibWFuZWtlbmJyYW5kLXFyIiwibmJmIjoxNjk4NjczNzEzfQ.pkTtFwHp2nmUTvYxaEBqkEbEjUE2QKSAoxnmN76IWKckae-W07EX80ciyNUYtK4itRlu3VwL3aBf9q9bbWc5OmC6eDMSIUqJZk1wGmJprFs0HMjFSOLpVZpQqdAB-ln5EnKxvbWMz8FjoWVHbkHPXp4LWp_2BNXBax7NG125YbUf3EbGPgkt4Jdf3Dq93ICOSMZXDtcudXnOzLSkUS3G3vSMikhqUmnFgxHKHZvgS6C5JUaursmx0JMh2mwaUDl6OYsfzbPa1OwzwUYB5na6qjp3wv-xmLTINcWsLuGpaiQ7HlbPBCM4Imi4dJJ_Qb1sYy4FDifmtmUC3U6bdsLQ0CAMOnArLXRoP2wg7rItg3XkMotPyBfij4J5IFhxDlB1AyhT49elG1RQsgJI9nHOpbj2bsno3utOU8Js_7th0fTRQEndQ-JYQt_4DdTAMIecV85L22NgBXpjTKX8pgfabcRnD-_0diz_IOTcpRWxM7J0eX3VVzSwiQsTtBshINngDOQ5vD87u5Il8LZwcq_FfYxdoyUjDrQcTQmeiLgjEvv96Pu8iW8tGZSFWTfK98aJbtg0vWpr5jNON7cNPLY51YdojhAiALMP1tQ1hfE_mlg3elxg4iMSNowTVpuJ0MCOAeIhRu5UfTt63ON126jg9I5K3wEi5Vt-duOCSqTO3qg";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  // Authorization: Auth,
};

$api.interceptors.request.use((config) => {
  // config.headers.Authorization = `${localStorage.getItem("token")}`;
  config.headers["Authorization"] = Auth;
  config.headers["Content-Type"] = "application/json";

  // config.timeout = 1000;
  return config;
});

export { $api, headers };
