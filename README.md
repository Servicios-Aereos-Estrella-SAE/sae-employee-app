# LoginApp

A React Native application following Hexagonal Architecture principles.

## Project Structure

```
src/
├── features/          # Módulos verticales (características)
│   └── [feature]/     # Ej: auth, users, todos, etc.
│       ├── domain/        # Entidades de dominio, objetos de valor, servicios de dominio
│       ├── application/   # Casos de uso, servicios de aplicación
│       └── infrastructure/ # Adaptadores, implementaciones de repositorios
│
└── shared/            # Código compartido entre características
    ├── domain/        # Lógica de dominio compartida
    ├── application/   # Servicios de aplicación compartidos
    └── infrastructure/ # Componentes de infraestructura compartidos
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

- Start the development server:

  ```bash
  npm start
  ```

- Run on iOS:

  ```bash
  npm run ios
  ```

- Run on Android:
  ```bash
  npm run android
  ```

### Expo Testing

- Build for development:
  ```bash
  expo build:android -t apk
  expo build:ios -t simulator
  ```

- Create a development build:
  ```bash
  expo prebuild
  ```

- Publish to Expo:
  ```bash
  expo publish
  ```

### Code Quality

- Lint code:

  ```bash
  npm run lint
  ```

- Fix linting issues:

  ```bash
  npm run lint:fix
  ```

- Format code:
  ```bash
  npm run format
  ```

## Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification. Each commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files

## Internationalization (i18n)

The project supports multiple languages (English and Spanish) using i18next. Translation files are located in the `i18n/locales` directory.

## Architecture

This project follows Hexagonal Architecture (Ports and Adapters) principles:

1. **Domain-Driven Design**: The domain layer contains core business logic and is framework-independent
2. **Dependency Inversion**: Dependencies flow inward, with the domain at the center
3. **Separation of Concerns**: Each layer has a specific responsibility
4. **Feature-based Organization**: Code is organized by features rather than technical layers
