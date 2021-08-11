/*
 * @Author: duanguang
 * @Date: 2020-12-09 15:43:49
 * @LastEditTime: 2021-08-10 22:18:12
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/jest.config.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
module.exports = {
  preset: 'ts-jest',
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    ".*\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  // 测试目录
  roots: ['<rootDir>/__tests__','<rootDir>/src/components'],
  // 对 ts tsx 文件使用 ts-jest 进行运行测试
  transform: {
    '.(ts|tsx)': 'ts-jest',
    /* 'legions-lunar': 'ts-jest', */
    "lodash": 'ts-jest',
    '.(js|jsx)': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!legions-lunar)',
   /*  'node_modules/(?!legions/store-react)', */
    'node_modules/(?!brain-store-react)',
  ],
  // 测试环境
  testEnvironment: 'node',
  // 测试文件匹配
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  collectCoverage: true,
  // 不计入覆盖率中
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  // 覆盖率达标阈值，不达标即测试失败，抛出 error
  coverageThreshold: {
    /* global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    }, */
  },
  /* "testEnvironment": "jsdom", */
  "setupFiles": [
    "./script/setup.ts",
    "jest-canvas-mock",
    /* "jsdom-global/register" */
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
