# Configuraração inicial

## Criar estrutura

```
yarn create react-app meetappweb
```

## Configurar Eslint, Prettier

```
$ yarn add eslint -D
$ yarn eslint --init
$ rm package-lock.json
$ yarn
$ yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
$ touch .prettierrc
$ touch jsconfig.json
```

## Configurando Root Import

```
yarn add customize-cra react-app-rewired babel-plugin-root-import eslint-import-resolver-babel-plugin-root-import -D
touch config-overrides.js
```

- config-overrides.js

```js
const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ])
);
```

- jsconfig.json - Para o vscode voltar a linkar os arquivos: root

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

- Para o eslint entender

```js
settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
```

## Estrutura de Navegação

- `yarn add react-router-dom`
- `yarn add history`

## Reactotron

- `yarn add reactotron-react-js`
- `mkdir config [src/config]`
- `touch ReactotronConfig.js [src/config/ReactotronConfig.js]`

## Form

- `yarn add @rocketseat/unform`
- `yarn add yup`

## Configurando Redux

- `yarn add redux redux-saga react-redux reactotron-redux reactotron-redux-saga redux-persist immer`

* `yarn add react-datepicker`
