module.exports = {
  testEnvironment: 'jsdom',
  modulePaths: ['./'],
  moduleDirectories: ['node_modules', 'pages', 'components'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
