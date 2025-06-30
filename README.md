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

## Commit Guidelines (Spanish)

Este proyecto utiliza [Conventional Commits](https://www.conventionalcommits.org/) **escritos en español**. Cada mensaje de commit debe seguir esta estructura:

```
<tipo>(alcance): <descripción breve en español>

[cuerpo opcional en español]

[pie opcional en español]
```

### Configuración Inicial

Para configurar tu entorno para commits en español:

```bash
npm run setup:git
```

### Ayuda con Commits

Para ver ejemplos de commits:

```bash
npm run commit:help
```

### Tipos de Commit

- **feat**: nueva funcionalidad
- **fix**: corrección de bug
- **perf**: mejora de rendimiento
- **refactor**: refactorización de código
- **style**: cambios de estilo (CSS, UI)
- **docs**: documentación
- **test**: pruebas
- **chore**: tareas de mantenimiento
- **ci**: integración continua
- **build**: construcción del proyecto

### Alcances Sugeridos

- asistencia, autenticación, pantalla, controlador, componente
- estilos, optimización, rendimiento, navegación, configuración
- biometría, ubicación, api, datos, validación

### Ejemplos de Commits

```bash
feat(asistencia): agregar validación de ubicación precisa
fix(autenticación): corregir pérdida de foco en input de contraseña
perf(pantalla): optimizar re-renders con React.memo y useMemo
refactor(controlador): mover cálculos de lógica de negocio al controlador
docs(reglas): actualizar reglas de optimización de rendimiento
style(estilos): mejorar diseño del botón de check-in
test(pruebas): agregar pruebas para componente de asistencia
```

### Reglas de Formato

- Usar imperativo presente en español (agregar, corregir, optimizar)
- Descripción breve: sin límite de caracteres
- Descripción detallada: sin límite de caracteres por línea
- Todos los commits deben estar en español
- Incluir el alcance entre paréntesis cuando sea relevante

## React Performance Optimization

Este proyecto implementa reglas estrictas de optimización de rendimiento para React Native:

### Reglas Principales

1. **Component Memoization**: Todos los componentes funcionales usan `React.memo()`
2. **Expensive Calculations**: Cálculos costosos envueltos con `useMemo()`
3. **Function Stability**: Funciones memorizadas con `useCallback()`
4. **Style Arrays**: Arrays de estilos optimizados con `useMemo()`
5. **Controller Pattern**: Separación clara entre lógica de negocio (controlador) y UI (componente)

### Documentación en Español

- Todos los comentarios JSDoc en español
- Comentarios de optimización explicativos en español
- Mensajes de error y logs en español
- Nombres de variables descriptivos en inglés, documentación en español

### Detección Automática

El proyecto incluye:
- Configuración VSCode para detectar patrones de rendimiento
- Reglas ESLint personalizadas
- Auto-fix automático para optimizaciones comunes
- Separación automática controlador/componente

Ver `.cursorrules` para detalles completos de las reglas de optimización.

## Internationalization (i18n)

The project supports multiple languages (English and Spanish) using i18next. Translation files are located in the `i18n/locales` directory.

## Architecture

This project follows Hexagonal Architecture (Ports and Adapters) principles:

1. **Domain-Driven Design**: The domain layer contains core business logic and is framework-independent
2. **Dependency Inversion**: Dependencies flow inward, with the domain at the center
3. **Separation of Concerns**: Each layer has a specific responsibility
4. **Feature-based Organization**: Code is organized by features rather than technical layers
