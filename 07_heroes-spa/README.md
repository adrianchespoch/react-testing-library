# Testing React Router DOM - Jest + React Testing Library

## Necessary Facilities

```
  yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react
  yarn add --dev @testing-library/react @types/jest jest-environment-jsdom

  yarn add identity-obj-proxy -D
```

### Optional: If fetch is used

```
  yarn add --dev whatwg-fetch
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
  "setupFiles": ["./jest.setup.js"]
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
```
