const axios = require('axios');
import  {BASE_URL}  from './config' ;
const refreshTokenEndpoint = `${BASE_URL}/refresh_token`;
let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
  try {
    const response = await axios.post(refreshTokenEndpoint, {
      refresh_token: refreshToken
    });
    accessToken = response.data.access_token;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
axios.interceptors.request.use(
 
  (config:any) => {
  config.headers["Authorization"]=`Bearer`+accessToken;
  return config;
    },
    (error:any) => {
    return Promise.reject(error);
  }
);
// Axios interceptor to handle expired tokens
axios.interceptors.response.use(
  (response:any) => response,
  (error:any) => {
    const originalRequest = error.config;

    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refreshAccessToken().then(() => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

//what is this code? I think it's unnecessary, I don't know who wrote it.