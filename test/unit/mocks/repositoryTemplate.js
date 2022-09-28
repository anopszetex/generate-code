export default `
export default class ProductRepository {
  constructor() {}

  async create(data) {
    return Promise.reject(new Error('Not implemented'));
  }

  async read(query) {
    return Promise.reject(new Error('Not implemented'));
  }

  async update(id, data) {
    return Promise.reject(new Error('Not implemented'));
  }

  async delete(id) {
    return Promise.reject(new Error('Not implemented'));
  }
}`;
