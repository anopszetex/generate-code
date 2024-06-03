/* eslint-disable node/no-unsupported-features/es-syntax */

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

import Util from '../../src/utils/index.js';
import { createFiles } from './../../src/createFiles.js';
import { createLayersIfNotExists } from './../../src/createLayers.js';

describe('#Integration - Files - Files Structure', () => {
  function getAllFunctionsFromInstance(instance) {
    const [, ...rest] = Reflect.ownKeys(Object.getPrototypeOf(instance));
    return rest;
  }

  function generateFilePath({
    mainPath,
    defaultMainFolder,
    layers,
    componentName,
  }) {
    return layers.map(layer => {
      const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;

      return join(mainPath, defaultMainFolder, layer, filename);
    });
  }

  const packageJSON = 'package.json';
  const packageJSONLocation = join('./test/integration/mocks/', packageJSON);

  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['service', 'factory', 'repository'].sort(),
    componentName: 'heroes',
  };

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'));

    await fsPromises.copyFile(
      packageJSONLocation,
      join(config.mainPath, packageJSON)
    );

    await createLayersIfNotExists(config);
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  test('Repository class should have create, read, update and delete methods', async () => {
    const myConfig = {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      ...config,
      layers: ['repository'],
    };

    await createFiles(myConfig);
    const [repositoryFile] = generateFilePath(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const instance = new Repository();

    const expectNotImplemented = async fn => {
      await expect(fn.call()).rejects.toThrow('Not implemented');
    };

    await Promise.all([
      expectNotImplemented(instance.create),
      expectNotImplemented(instance.read),
      expectNotImplemented(instance.update),
      expectNotImplemented(instance.delete),
    ]);
  });
  test('Service should should have the same signature of repository and call all its methods', async () => {
    const myConfig = {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      ...config,
      layers: ['repository', 'service'],
    };

    await createFiles(myConfig);
    const [repositoryFile, serviceFile] = generateFilePath(myConfig);

    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);

    const repository = new Repository();
    const service = new Service({ repository });

    const allRepositoryMethods = getAllFunctionsFromInstance(repository);

    allRepositoryMethods.forEach(method => {
      jest.spyOn(repository, method).mockResolvedValue();
    });

    getAllFunctionsFromInstance(service).forEach(method =>
      service[method].call(service, [])
    );

    allRepositoryMethods.forEach(method => {
      expect(repository[method]).toHaveBeenCalled();
    });
  });

  test('Factory instance should match layers', async () => {
    const myConfig = {
      ...config,
    };

    await createFiles(myConfig);

    const [factoryFile, repositoryFile, serviceFile] =
      generateFilePath(myConfig);

    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const { default: Factory } = await import(factoryFile);

    const expectedInstance = new Service({ repository: new Repository() });
    const instance = Factory.getInstance();

    expect(instance).toMatchObject(expectedInstance);
    expect(instance).toBeInstanceOf(Service);
  });
});
