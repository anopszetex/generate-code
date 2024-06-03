/* eslint-disable node/no-extraneous-import */
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import fsPromises from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

import { createLayersIfNotExists } from './../../src/createLayers.js';

describe('#Layers - Files Structure', () => {
  async function getFolders(config) {
    return fsPromises.readdir(join(config.mainPath, config.defaultMainFolder));
  }

  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['service', 'factory', 'respository'].sort(),
  };

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true, force: true });
  });

  test('#should not create folders if it exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  });
  test('#should create folders if it exists', async () => {
    const beforeRun = await getFolders(config);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(afterRun).toEqual(beforeRun);
  });
});
