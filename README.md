> 30 - May - 2023

# Auth Service

## Microservice Architecture...

- npm init -y
- yarn add -D typescript
- yarn add -D @types/express
- yarn add -D @types/cors
- yarn add -D ts-node-dev
- yarn add @types/bcrypt
- yarn add @types/jsonwebtoken
- yarn add @types/cookie-parser
- yarn add express
- yarn add cors
- yarn add mongoose
- yarn add dotenv
- yarn add winston `have "node module" incompatible issue`
- yarn add winston-daily-rotate-file
- yarn add zod `have "node module" incompatible issue`
- yarn add http-status
- yarn add bcrypt
- yarn add jsonwebtoken
- yarn add cookie-parser

<br />

```
tsc --init
```

```js
"scripts": {
    "start": "ts-node-dev --respawn --transpile-only src/connection"
}

yarn start
```

<br />

## Project coding rules setup

| Package                | Usage                                               |
| ---------------------- | --------------------------------------------------- |
| Eslint                 | Enforce rules                                       |
| Prettier               | Code formatter                                      |
| Eslint-Config-Prettier | format conflict resolver                            |
| [Husky][link]          | Pre-commit hook - for check Eslint + Prettier rules |
| Lint-stage             | Only check `staging file change` for git commit     |

- yarn add -D eslint
- yarn add -D @typescript-eslint/parser
- yarn add -D @typescript-eslint/eslint-plugin
- yarn add -D @typescript-eslint/eslint-plugin
- yarn add -D prettier
- yarn add -D eslint-config-prettier
- yarn add -D husky
- yarn husky install
- yarn add -D lint-staged `have "node module" incompatible issue`

```
nvm list

nvm install 18.16.0

nvm use 18.16.0 [run as administrator at cmd]
```

<br />

```
.eslintrc
.eslintignore
.prettierrc
```

```js
"scripts": {
    "start": "ts-node-dev --respawn --transpile-only src/connection",
    "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
    "lint:fix": "eslint . --fix",
    "prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
    "prettier:fix": "prettier --write .",
    "lint-prettier": "yarn lint:check && yarn prettier:check"
},
"lint-staged": {
    "src/**/*.ts": "yarn lint-prettier"
},
```

```js
yarn husky add .husky/pre-commit "yarn lint-staged"
```

[link]: https://typicode.github.io/husky/getting-started.html

## Project Sections:-

- user
  - student
  - admin
  - faculty
- academy semester
- academy department
- academy faculty
- user auth login
- refresh token
- role base resource access

## Learning Context:-

- File & Folder Structure...
- TypeScript Implementation...
- user input verification by zod middleware
