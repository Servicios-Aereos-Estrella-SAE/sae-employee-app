module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [2, 'never', Infinity],
    'body-max-line-length': [2, 'never', Infinity],
    'header-max-length': [2, 'never', Infinity]
  }
}
