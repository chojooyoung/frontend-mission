import axios from 'axios';
import { setInterceptors } from './common/interceptors';

const API_END_POINT = 'https://virtserver.swaggerhub.com/lkaybob/projectlion-vue/1.0.0';
function createInstance() {
  const instance = axios.create({
    // AxiosRequestConfig = axios 공통 설정란
    baseURL: API_END_POINT, // process.env.API_ENDPOINT
  });

  return setInterceptors(instance);
}

const instance = createInstance();

// login, signup
function registerUser(userData) {
  return instance.post('join', userData); // 어떤서버로 요청할지 url
}

function loginUser(userData) {
  return instance.post('login', userData);
}

function itemList() {
  return instance.get('/item');
}

function itemInfo(itemNumber) {
  return instance.get(`/channels/${itemNumber}`);
}

function wishItemList() {
  return instance.get('/wish');
}

function wishItem(itemNumber) {
  return instance.post('/users/upload-photo', itemNumber);
}

function userInfo() {
  return instance.get('/info');
}

function updateUserInfo(userData) {
  return instance.put('/info', userData);
}

function cartList() {
  return instance.get('/cart');
}

function Addcart(itemNumber) {
  return instance.post('/cart', itemNumber);
}

export {
  createInstance,
  registerUser,
  loginUser,
  itemList,
  itemInfo,
  wishItemList,
  wishItem,
  userInfo,
  updateUserInfo,
  cartList,
  Addcart,
};
