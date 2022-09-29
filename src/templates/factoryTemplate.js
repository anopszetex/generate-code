import Util from './../utils/index.js';

const serviceNameDepAnchor = '$$serviceNameDep';
const repositoryNameDepAnchor = '$$repositoryNameDep';

const componentNameAnchor = '$$componentName';

const serviceNameAnchor = '$$serviceName';
const repositoryNameAnchor = '$$repositoryName';

const template = `
import $$repositoryName from '../repository/$$repositoryNameDep.js';
import $$serviceName from '../service/$$serviceNameDep.js';

export default class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoryName();
    const service = new $$serviceName({ repository });

    return service;
  }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replace(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replace(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
    .replace(repositoryNameDepAnchor, Util.lowerCaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(
      repositoryNameAnchor,
      Util.upperCaseFirstLetter(repositoryName)
    );

  return {
    fileName: `${Util.lowerCaseFirstLetter(componentName)}Factory`,
    template: txtFile,
  };
}
