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

-- Backend base URL should be configured using env var `VITE_API_BASE` (example: `http://localhost:8000`). Note: token endpoints are under `/api/` while some resources are at root `/`.
-- Registration endpoint: POST `/api/usuarios/` expects { email, name, password, ... }
-- Token endpoint: POST `/api/token/` expects { email, password } and returns { access, refresh }
-- Current user: GET `/api/usuarios/me/` expects Authorization Bearer token and returns the authenticated user

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

Meals UI
--
This project includes a full frontend UI for the backend "Meals" (refeições) feature in:

- src/components/MealForm.vue — create a meal with dynamic ingredients and search autocomplete
- src/components/MealsList.vue — paginated list, date filter, view detail, delete
- src/components/MealDetail.vue — meal detail view with ingredient macros and delete
- src/components/WeeklySummary.vue — weekly totals table

Endpoints are used under /api/meals/ and the app expects an Authorization: Bearer <token> header (token stored in localStorage as access_token). Use the existing dev environment to run and test.

Tests were added in src/components/__tests__ to cover autocomplete, form submit, listing and weekly summary (Vitest + Vue Test Utils). Run the test runner with `npm test` in your environment.

```
