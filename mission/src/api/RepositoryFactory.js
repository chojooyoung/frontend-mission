import ItemRepository from './repositories/ItemRepository';

const repositories = {
  items: ItemRepository,
};
export default {
  get: (name) => repositories[name],
};
