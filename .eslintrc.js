module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'prettier',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['unused-imports', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    semi: ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    eqeqeq: 'off',
    'function-paren-newline': 0,
    'react/jsx-curly-newline': 0,
    'import/first': 0,
    'no-undef': 2,
    'no-use-before-define': [2, 'nofunc'],
    'no-unused-vars': 0,
    'unused-imports/no-unused-imports': 2,
    'unused-imports/no-unused-vars': 2,
    'import/prefer-default-export': 0,
    'no-confusing-arrow': 0,
    'no-restricted-globals': 0,
    'import/namespace': [2, { allowComputed: true }],
    'no-return-assign': 0,
    'object-curly-newline': 0,
    'max-len': [2, 140, 4, { ignoreUrls: true }],
    'class-methods-use-this': 0,
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/no-named-as-default-member': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'react/jsx-one-expression-per-line': 'off',
    'import/no-useless-path-segments': 'off',
    'import/order': 'off',
    'react/react-in-jsx-scope': 'off',
    'implicit-arrow-linebreak': 'off',
    'linebreak-style': 0,
    'react/prop-types': 'off',
    'no-useless-escape': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'react/static-property-placement': 0,
    'comma-dangle': 2,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [0],
    'react/prefer-stateless-function': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-named-as-default': ['off'],
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
