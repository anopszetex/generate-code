import Util from './../utils/index.js';

const componentNameAnchor = '$$componentName';
const currentContextAnchor = '$$currentContext';
const repositoryAnchor = '$$repositoryName';

const template = `
export default class $$componentNameService {
  constructor({ repository: $$repositoryName }) {
    $$currentContext = $$repositoryName;
  }

  async create(data) {
    return $$currentContext.create(data);
  }

  async read(query) {
    return $$currentContext.read(query);
  }

  async update(id, data) {
    return $$currentContext.update(id, data);
  }

  async delete(id) {
    return $$currentContext.delete(id);
  }
}`;

export function serviceTemplate(componentName, repositoryName) {
  const currentContext = `this.${repositoryName}`;

  const txtFile = template
    .replace(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, currentContext)
    .replaceAll(repositoryAnchor, repositoryName);

  return {
    fileName: `${Util.lowerCaseFirstLetter(componentName)}Service`,
    template: txtFile,
  };
}
