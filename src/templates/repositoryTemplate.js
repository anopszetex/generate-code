const template = `
export default class Repository {
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
}
`;

export function repositoryTemplate(componentName) {}
