import Client from '../AxiosClient';

const resource = '/wish';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  setWish(itemNumber) {
    return Client.post(`${resource}`, itemNumber);
  },
};
