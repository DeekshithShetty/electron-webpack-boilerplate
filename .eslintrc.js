const fs = require('fs');
const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    env: {
        'browser': true,
        'node': true,
        'es6': true,
        'mocha': true
    },
    rules: {
       'prettier/prettier': ['error', prettierOptions],
       'prefer-destructuring': 1,
       'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }], 
    }
};