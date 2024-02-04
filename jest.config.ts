import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/__tests__/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;