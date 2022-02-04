import Client from '../AxiosClient';

const resource = '/item';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getItem(id) {
    return Client.get(`${resource}/${id}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  update(payload, id) {
    return Client.put(`${resource}/${id}`, payload);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
};
