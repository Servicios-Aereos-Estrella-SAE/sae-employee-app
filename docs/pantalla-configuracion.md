# Pantalla de Configuración

## Descripción

La **Pantalla de Configuración** (`SettingsScreen`) es una pantalla que permite al usuario gestionar y personalizar las opciones de la aplicación. Esta pantalla sigue el patrón arquitectónico establecido en el proyecto, separando la lógica de presentación en tres archivos principales.

## Ubicación de Archivos

```
presentation/screens/settings/
├── settings.screen.tsx              # Componente principal de la pantalla
├── settings-screen.controller.tsx   # Controlador con la lógica de negocio
└── settings.style.tsx              # Estilos de la pantalla
```

## Funcionalidades

### 1. Configuración de Biometría
- **Descripción**: Botón que navega hacia la pantalla de configuración biométrica
- **Función**: `navigateToBiometrics()`
- **Icono**: Huella digital (`fingerprint`)
- **Navegación**: Direge a `biometricsConfigScreen`

### 2. Control de Tema
- **Descripción**: Permite alternar entre el tema claro y oscuro de la aplicación
- **Función**: `toggleTheme()`
- **Iconos**: 
  - Tema claro: Sol (`weather-sunny`)
  - Tema oscuro: Luna (`weather-night`)
- **Estado actual**: Se muestra el tema actualmente seleccionado

### 3. Control de Idioma
- **Descripción**: Permite cambiar entre español e inglés
- **Función**: `toggleLanguage()`
- **Icono**: Traducir (`translate`)
- **Idiomas soportados**:
  - Español (es)
  - Inglés (en)
- **Estado actual**: Se muestra el idioma actualmente seleccionado

## Arquitectura

### Componente Principal (`settings.screen.tsx`)

El componente principal de la pantalla que:
- Renderiza la interfaz de usuario
- Utiliza `AuthenticatedLayout` para el layout base
- Implementa las traducciones con `useTranslation`
- Consume el controlador para la lógica de negocio

**Dependencias principales:**
- `React Native`: Componentes básicos de UI
- `React Native Paper`: Componentes de Material Design
- `React Native Vector Icons`: Iconos de la interfaz
- `react-i18next`: Sistema de internacionalización

### Controlador (`settings-screen.controller.tsx`)

Contiene toda la lógica de negocio de la pantalla:

**Estado gestionado:**
- `currentLanguage`: Idioma actual de la aplicación
- `themeType`: Tipo de tema actual (light/dark)

**Funciones principales:**
- `navigateToBiometrics()`: Navegación a configuración biométrica
- `toggleTheme()`: Alternador de tema claro/oscuro
- `toggleLanguage()`: Alternador de idioma español/inglés
- `getThemeType()`: Convertidor de tipo de tema a string

**Hooks utilizados:**
- `useNavigation`: Para la navegación entre pantallas
- `useAppTheme`: Para el manejo del tema de la aplicación
- `useTranslation`: Para las traducciones
- `useState` y `useEffect`: Para el manejo del estado local

### Estilos (`settings.style.tsx`)

Define todos los estilos de la pantalla con soporte para temas:

**Características de los estilos:**
- **Responsivo**: Utiliza `Dimensions` para adaptarse a diferentes tamaños de pantalla
- **Soporte para temas**: Adapta colores según el tema claro/oscuro
- **Sombras y elevaciones**: Para efectos visuales en las tarjetas
- **Iconos coloreados**: Diferentes colores para cada tipo de configuración

**Estilos principales:**
- `optionCard`: Tarjetas para cada opción de configuración
- `iconContainer`: Contenedores circulares para los iconos
- `optionContent`: Contenido de texto de cada opción
- `currentValue`: Muestra el valor actual de la configuración

## Traducciones

### Español (`src/shared/domain/i18n/locales/es.json`)
```json
"screens": {
  "settings": {
    "title": "Configuración",
    "subtitle": "Personaliza tu experiencia en la aplicación",
    "biometricsOption": {
      "title": "Configuración de Biometría",
      "description": "Gestiona la autenticación biométrica"
    },
    "themeOption": {
      "title": "Tema de la Aplicación",
      "description": "Cambia entre modo claro y oscuro",
      "lightTheme": "Tema Claro",
      "darkTheme": "Tema Oscuro"
    },
    "languageOption": {
      "title": "Idioma",
      "description": "Selecciona el idioma de la aplicación",
      "spanish": "Español",
      "english": "English"
    }
  }
}
```

### Inglés (`src/shared/domain/i18n/locales/en.json`)
```json
"screens": {
  "settings": {
    "title": "Settings",
    "subtitle": "Customize your app experience",
    "biometricsOption": {
      "title": "Biometrics Configuration",
      "description": "Manage biometric authentication"
    },
    "themeOption": {
      "title": "App Theme",
      "description": "Switch between light and dark mode",
      "lightTheme": "Light Theme",
      "darkTheme": "Dark Theme"
    },
    "languageOption": {
      "title": "Language",
      "description": "Select app language",
      "spanish": "Español",
      "english": "English"
    }
  }
}
```

## Navegación

### Configuración en el Navegador
La pantalla está registrada en `navigation/app-navigator.tsx`:

```typescript
<Stack.Screen
  name="settingsScreen"
  component={SettingsScreen}
/>
```

### Tipo de Navegación
Definida en `navigation/types/types.ts`:

```typescript
export type RootStackParamList = {
  // ... otras pantallas
  settingsScreen: undefined
}
```

## Integración con Otras Pantallas

### Pantalla de Biometría
- **Navegación desde**: Botón "Configuración de Biometría"
- **Pantalla destino**: `biometricsConfigScreen`
- **Función**: Permite gestionar la autenticación biométrica

### Sistema de Temas
- **Integración**: Utiliza `useAppTheme` del contexto global
- **Persistencia**: Los cambios de tema se guardan automáticamente
- **Efecto**: El cambio se aplica inmediatamente en toda la aplicación

### Sistema de Idiomas
- **Integración**: Utiliza `i18next` para el cambio de idioma
- **Persistencia**: Los cambios se guardan automáticamente
- **Efecto**: El cambio se aplica inmediatamente en toda la aplicación

## Uso

Para navegar a la pantalla de configuración desde otra pantalla:

```typescript
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/types/types'

const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

// Navegar a configuración
navigation.navigate('settingsScreen')
```

## Consideraciones Técnicas

1. **Autenticación requerida**: La pantalla utiliza `AuthenticatedLayout`, por lo que requiere autenticación
2. **Compatibilidad**: Compatible con iOS y Android
3. **Accesibilidad**: Incluye labels apropiados y soporte para lectores de pantalla
4. **Performance**: Utiliza `TouchableOpacity` con `activeOpacity` para mejor feedback visual
5. **Manejo de estado**: El estado se gestiona localmente en el controlador

## Futuras Mejoras

1. **Más opciones de configuración**: Notificaciones, preferencias de visualización, etc.
2. **Configuración avanzada de idioma**: Soporte para más idiomas
3. **Temas personalizados**: Permitir temas personalizados del usuario
4. **Configuración de la cuenta**: Integración con configuraciones del perfil de usuario 