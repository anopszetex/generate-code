import Util from './../utils/index.js';

const componentNameAnchor = '$$componentName';

const template = `
export default class $$componentNameRepository {
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

export function repositoryTemplate(componentName) {
  return {
    fileName: `${Util.lowerCaseFirstLetter(componentName)}Repository`,
    template: template.replace(
      componentNameAnchor,
      Util.upperCaseFirstLetter(componentName)
    ),
  };
}
