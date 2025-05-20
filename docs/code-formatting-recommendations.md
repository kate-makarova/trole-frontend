# Code Formatting Recommendations

This document provides recommendations for ensuring consistent code formatting across the Trole Frontend project.

## Current State

The project currently has an `.editorconfig` file that defines basic formatting rules:
- UTF-8 character encoding
- Space indentation with 2 spaces
- Insert final newline at the end of files
- Trim trailing whitespace
- Use single quotes for TypeScript files

However, examination of key files reveals inconsistencies in code formatting:
1. Missing semicolons at the end of statements
2. Inconsistent spacing around operators and in conditional statements
3. Inconsistent indentation in some methods
4. Inconsistent use of equality operators (`==` vs `===`)

## Recommendations

### 1. Add Prettier for Consistent Formatting

[Prettier](https://prettier.io/) is an opinionated code formatter that supports TypeScript and Angular. It can be integrated with the project to ensure consistent formatting across all files.

#### Installation:
```bash
npm install --save-dev prettier
```

#### Configuration:
Create a `.prettierrc` file in the project root with the following configuration:
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 2. Add ESLint for Code Quality

[ESLint](https://eslint.org/) can be used alongside Prettier to enforce code quality rules beyond formatting.

#### Installation:
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-angular
```

#### Configuration:
Create an `.eslintrc.js` file in the project root with appropriate rules.

### 3. Add Pre-commit Hooks

Use [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to automatically format code before commits.

#### Installation:
```bash
npm install --save-dev husky lint-staged
```

#### Configuration:
Add the following to `package.json`:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,html,css,scss}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

### 4. Add NPM Scripts for Formatting

Add the following scripts to `package.json`:
```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,html,css,scss}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,css,scss}\"",
    "lint": "eslint \"src/**/*.ts\"",
    "lint:fix": "eslint \"src/**/*.ts\" --fix"
  }
}
```

### 5. Update CI Pipeline

If the project uses a CI pipeline, add steps to check formatting and linting:
```yaml
- name: Check formatting
  run: npm run format:check
- name: Lint
  run: npm run lint
```

## Implementation Plan

1. Install and configure Prettier
2. Run Prettier on the entire codebase to establish a baseline of consistent formatting
3. Install and configure ESLint
4. Add pre-commit hooks to maintain formatting consistency
5. Update documentation to include information about the formatting tools and expectations

## Benefits

- Consistent code style across the entire project
- Reduced time spent on code reviews discussing formatting issues
- Improved code readability and maintainability
- Automatic enforcement of formatting rules