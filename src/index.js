#!/usr/bin/env node

/* eslint-disable node/no-unsupported-features/es-syntax */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { createFiles } from './createFiles.js';
import { createLayersIfNotExists } from './createLayers.js';

const {
  argv: { componentName },
} = yargs(hideBin(process.argv))
  .command('skeleton', 'Create a new skeleton project', yargs => {
    yargs
      .option('component-name', {
        alias: 'c',
        description: "Component's name",
        type: 'array',
      })
      .example(
        'skeleton --component-name product',
        'Create a project with a single domain'
      )
      .example(
        'skeleton -c product -c person -c colors',
        'Creates a project with a list of domain'
      );
  })
  .epilogue('For more information give me a star on GitHub!');

const env = process.env.NODE_ENV;

const defaultMainFolder = env === 'dev' ? 'tmp' : 'src';
const layers = ['repository', 'service', 'factory'].sort();

const config = {
  layers,
  defaultMainFolder,
  mainPath: '.',
};

await createLayersIfNotExists(config);

const pendingPromises = [];

for (const domain of componentName) {
  pendingPromises.push(createFiles({ ...config, componentName: domain }));
}

await Promise.all(pendingPromises);
