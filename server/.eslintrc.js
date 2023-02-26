module.exports = {
  extends: ['./.eslint-airbnb-base'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'no-promise-executor-return': 'off',
    'no-param-reassign': 0
    // 'no-console': ['error', { allow: ['warn', 'error'] }]
  }
};
