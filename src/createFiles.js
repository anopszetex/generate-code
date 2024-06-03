import fsPromises from 'fs/promises';

import templates from './templates/index.js';
import Util from './utils/index.js';

/**
 * Function responsible to pass the arguments to the templates
 *
 * @param {string} layer - layer name
 * @param {string} componentName - component name
 * @returns {string[]}
 */
function defaultDependencies(layer, componentName) {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`],
  };

  return dependencies[layer].map(Util.lowerCaseFirstLetter);
}

/**
 * Function responsible to create the files
 *
 * @param {Array<{
 * fileName: string,
 * template: string
 * }>} pendingFilesToWrite
 * @returns {Promise<void>}
 */
async function executeWrites(pendingFilesToWrite) {
  return Promise.all(
    pendingFilesToWrite.map(file => {
      return fsPromises.writeFile(file.fileName, file.template);
    })
  );
}

/**
 * Function that creates the files structure for the component
 *
 * @param {Object} args
 * @param {string} args.mainPath - path to the main folder
 * @param {string} args.defaultMainFolder - default main folder name
 * @param {string} args.componentName - name of the component
 * @param {string[]} args.layers - layers to be created
 * @returns {Promise<{success: boolean}|{error: string}>}
 * @returns
 */
export async function createFiles(args) {
  const { mainPath, defaultMainFolder, layers, componentName } = args;

  const keys = Object.keys(templates);

  const pendingFilesToWrite = [];

  for (const layer of layers) {
    const chosenTemplate = keys.find(key => key.includes(layer));

    if (!chosenTemplate) {
      return { error: 'the chosen layer doesnt have a template' };
    }

    const template = templates[chosenTemplate];

    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;
    const dependencies = defaultDependencies(layer, componentName);

    const { fileName, template: txtFile } = template(
      componentName,
      ...dependencies
    );

    // e.g: /Users/Document/codegen/src/repository/heroesRepository.js
    const path = `${targetFolder}/${Util.lowerCaseFirstLetter(fileName)}.js`;

    pendingFilesToWrite.push({ fileName: path, template: txtFile });
  }

  await executeWrites(pendingFilesToWrite);

  return { success: true };
}
