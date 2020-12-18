module.exports = {
  preset: 'ts-jest',
  // 测试目录
  roots: ['<rootDir>/__tests__'],
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
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts$/,
        ignoreCodes: ['2593', '2304'],
      },
    },
  },
};
