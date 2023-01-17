/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // ts test에 시간이 너무 많이 소요되어서 추가한 패키지 swc + jest option(--runInBand) 추가
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
