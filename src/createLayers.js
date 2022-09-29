import fs from 'fs';
import fsPromises from 'fs/promises';

/**
 * Create layers if not exists in the main path
 * folder structure provided by the user in the CLI
 * command line arguments.
 *
 * @param {Object} args
 * @param {string} args.mainPath - Main path to create the layers.
 * @param {string} args.defaultMainFolder - Default main folder name.
 * @param {string[]} args.layers - Layers to create.
 * @returns {Promise<string|undefined>}
 */
export async function createLayersIfNotExists(args) {
  const { mainPath, defaultMainFolder, layers } = args;

  const defaultPath = `${mainPath}/${defaultMainFolder}`;
  const foldersToCreate = layers.filter(layer => !fs.existsSync(layer));

  if (!foldersToCreate.length) {
    return;
  }

  const results = foldersToCreate.map(folder =>
    fsPromises.mkdir(`${defaultPath}/${folder}`, { recursive: true })
  );

  return Promise.all(results);
}
