# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Auth / Backend expectations

- Backend base URL should be configured using env var `VITE_API_BASE` (example: `http://localhost:8000/api`).
- Registration endpoint: POST `/usuarios/` expects { email, name, password, ... }
- Token endpoint: POST `/token/` expects { email, password } and returns { access, refresh }
- Current user: GET `/usuarios/me/` expects Authorization Bearer token and returns the authenticated user

Fields like `cpf` and `preferencias` were removed from the backend and no longer used by the frontend.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
