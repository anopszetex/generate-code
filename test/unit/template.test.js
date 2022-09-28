import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import templates from './../../src/templates/index.js';
import { repositoryTemplateMOck } from './mocks/index.js';

const { repositoryTemplate } = templates;

describe('#Codegen 3-layers arch', () => {
  const componentName = 'product';
  const repositoryName = `${componentName}Repository`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test.todo('#should generate a repository template');
  test.todo('#should generate a service template');
  test.todo('#should generate a factory template');
});
