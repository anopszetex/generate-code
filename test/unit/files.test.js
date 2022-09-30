/* eslint-disable node/no-extraneous-import */
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import fsPromises from 'fs/promises';

import { createFiles } from '../../src/createFiles.js';
import templates from '../../src/templates/index.js';

describe('#Layers - Files Structure', () => {
  const defaultLayers = ['service', 'repository', 'factory'];

  const config = {
    mainPath: './',
    defaultMainFolder: 'src',
    componentName: 'heroes',
    layers: defaultLayers,
  };

  const repositoryLayer = `${config.componentName}Repository`;
  const serviceLayer = `${config.componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('#should not create file structure on inexistent templates', async () => {
    const myConfig = {
      ...config,
      layers: ['inexistent'],
    };

    const expected = { error: 'the chosen layer doesnt have a template' };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
  });

  test('#repository should not add additional dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();

    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      fileName: 'heroesRepository',
      template: '',
    });

    const myConfig = {
      ...config,
      layers: ['repository'],
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(fsPromises.writeFile).toHaveBeenCalledWith(
      './/src/repository/heroesRepository.js',
      undefined
    );

    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );

    expect(templates.repositoryTemplate).toHaveBeenCalledTimes(1);
  });

  test('#service should have repository as dependency', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();

    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      fileName: 'heroesRepository',
      template: '',
    });

    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({
      fileName: 'heroesService',
      template: '',
    });

    const myConfig = {
      ...config,
      layers: ['repository', 'service'],
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);

    expect(fsPromises.writeFile).toHaveBeenCalledWith(
      './/src/repository/heroesRepository.js',
      undefined
    );

    expect(fsPromises.writeFile).toHaveBeenCalledWith(
      './/src/service/heroesService.js',
      undefined
    );

    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );

    expect(templates.serviceTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer
    );

    expect(templates.serviceTemplate).toHaveBeenCalledTimes(1);
    expect(templates.repositoryTemplate).toHaveBeenCalledTimes(1);
  });

  test('#factory should have repository and service as dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();

    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      fileName: 'heroesRepository',
      template: '',
    });

    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({
      fileName: 'heroesService',
      template: '',
    });

    jest.spyOn(templates, templates.factoryTemplate.name).mockReturnValue({
      fileName: 'heroesFactory',
      template: '',
    });

    const myConfig = {
      ...config,
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);

    expect(fsPromises.writeFile).toHaveBeenCalledWith(
      './/src/repository/heroesRepository.js',
      undefined
    );

    expect(fsPromises.writeFile).toHaveBeenCalledWith(
      './/src/service/heroesService.js',
      undefined
    );

    expect(fsPromises.writeFile).toHaveBeenCalledWith(
      './/src/factory/heroesFactory.js',
      undefined
    );

    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );

    expect(templates.serviceTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer
    );

    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer,
      serviceLayer
    );

    expect(templates.serviceTemplate).toHaveBeenCalledTimes(1);
    expect(templates.repositoryTemplate).toHaveBeenCalledTimes(1);
    expect(templates.factoryTemplate).toHaveBeenCalledTimes(1);
  });
});
