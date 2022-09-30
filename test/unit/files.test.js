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

    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );
  });

  test.todo('#service should have repository as dependency');

  test.todo('#factory should have repository and service as dependencies');
});
