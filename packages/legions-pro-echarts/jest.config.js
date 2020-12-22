/*
 * @Author: duanguang
 * @Date: 2020-12-09 15:43:49
 * @LastEditTime: 2020-12-22 17:31:41
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/jest.config.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
module.exports = {
  preset: 'ts-jest',
  // 测试目录
  roots: ['<rootDir>/__tests__','<rootDir>/src/components'],
  // 对 ts tsx 文件使用 ts-jest 进行运行测试
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
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
  "testEnvironment": "jsdom",
  "setupFiles": [
    "./script/setup.ts",
    "jest-canvas-mock",
    /* "jsdom-global/register" */
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts$/,
        ignoreCodes: ['2593', '2304'],
      },
    },
  },
};
