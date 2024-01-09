# Intro Testing Redux Toolkit Journal App - Jest + React Testing Library

## Necessary Facilities

```
  yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react
  yarn add --dev @testing-library/react @types/jest jest-environment-jsdom
```

### Optional: If fetch is used

```
  yarn add --dev whatwg-fetch
```

### Optional: If style files and/or images are used in a FC

```
  yarn add identity-obj-proxy -D
```

### Optional: If working with environment variables

```
  yarn add -D dotenv
```

## Scripts

- package.json

```json
  "scripts: {
    ...
    "test": "jest --watchAll"

  }
```

## Babel configuration

- babel.config.json

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "esmodules": true } }],
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

## Supports .css and image files

- jest.config.json

```json
{
  "testEnvironment": "jest-environment-jsdom",

  // If style files and/or images are used in a FC
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },

  // Optional: If fetch is used
  "setupFiles": ["./jest.setup.js"],

  // Optional: If any thunk is tested
  "transformIgnorePatterns": []
}
```

- **mocks**: If style files and/or images are used in a FC

```
project
└───src
└───__mocks__
    │   fileMock.js

```

- fileMock.js

```js
module.exports = '';
```

- Optional: jest.setup.js <- If fetch is used

```js
import 'whatwg-fetch';

// If working with environment variables
require('dotenv').config({
  path: '.env.test',
});

jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env }),
}));
```

- Works with environment variables: getEnvironments.js

```js
export const getEnvironments = () => {
  import.meta.env;

  return {
    ...import.meta.env,
  };
};
```

- Using environment variables:

```js
const { VITE_ANY_KEY } = getEnvironments();
```
