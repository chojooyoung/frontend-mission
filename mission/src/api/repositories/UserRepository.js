import Client from '../AxiosClient';

const resource = '/info';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getItemList(userData) {
    return Client.put(`${resource}`, userData);
  },
};
