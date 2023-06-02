> 30 - May - 2023

# Auth Service

## Microservice Architecture...


* npm init -y
* yarn add -D typescript
* yarn add -D @types/express
* yarn add -D @types/cors
* yarn add -D ts-node-dev
* yarn add express
* yarn add cors
* yarn add mongoose
* yarn add dotenv

```
tsc --init
```

```
"start": "ts-node-dev --respawn --transpile-only src/connection",

yarn start
```


## Project coding rules setup

| Package  | Usage           |
|----------|-----------------| 
|Eslint    | Enforce rules   | 
|Prettier  | Code formatter  | 
|Husky     | Pre-commit hook - for check Eslint + Prettier rules | 
|Lint-stage| Only check staging file change for git commit | 
 

* yarn add -D eslint 
* yarn add -D @typescript-eslint/parser 
* yarn add -D @typescript-eslint/eslint-plugin
* yarn add -D prettier

```
.eslintrc
.eslintignore
.prettierrc
```

```js
"scripts": {
    "start": "ts-node-dev --respawn --transpile-only src/connection",
    "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
    "lint:fix": "eslint --fix",
    "prettier:check": "prettier --write ."
},
```