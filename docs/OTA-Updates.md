# Actualizaciones OTA en SAE Empleados

Este documento explica cómo funcionan las actualizaciones OTA (Over The Air) en la aplicación de SAE Empleados y cómo publicar nuevas actualizaciones.

## ¿Qué son las actualizaciones OTA?

Las actualizaciones OTA permiten actualizar el contenido JavaScript de la aplicación sin necesidad de enviar una nueva versión a las tiendas de aplicaciones (App Store y Play Store). Esto es útil para corregir errores menores o agregar pequeñas funcionalidades sin tener que pasar por el proceso de revisión de las tiendas.

## Limitaciones de las actualizaciones OTA

Las actualizaciones OTA solo pueden modificar el código JavaScript y los assets de la aplicación. No pueden:

- Cambiar el código nativo
- Modificar el archivo `app.json`
- Instalar nuevos módulos nativos

Si necesitas hacer alguno de estos cambios, deberás publicar una nueva versión de la aplicación en las tiendas.

## Comportamiento en desarrollo vs producción

**Importante:** Las actualizaciones OTA **no funcionan en Expo Go** (el entorno de desarrollo). Verás mensajes en la consola indicando que se están omitiendo las comprobaciones de actualizaciones en modo desarrollo.

Para probar las actualizaciones OTA, necesitas:
1. Compilar la aplicación con EAS Build (`npm run build:preview`)
2. Instalar la versión compilada en tu dispositivo
3. Publicar una actualización (`npm run update:preview`)
4. Abrir la aplicación en el dispositivo para recibir la actualización

## Configuración

La aplicación está configurada para buscar actualizaciones automáticamente al iniciar. Si encuentra una actualización, mostrará un diálogo preguntando al usuario si desea actualizar.

## Publicar actualizaciones

Hay dos canales configurados para las actualizaciones:

- **preview**: Para pruebas internas
- **production**: Para usuarios finales

### Publicar una actualización de prueba

```bash
npm run update:preview
```

### Publicar una actualización de producción

```bash
npm run update:production
```

## Compilar la aplicación

Si necesitas hacer cambios que requieren una nueva compilación:

### Compilar versión de prueba

```bash
npm run build:preview
```

### Compilar versión de producción

```bash
npm run build:production
```

## Estrategia de versiones

La aplicación utiliza la política `appVersion` para las actualizaciones OTA, lo que significa que solo recibirá actualizaciones compatibles con la versión nativa instalada.

Si cambias la versión en `app.json`, asegúrate de actualizar los perfiles de compilación correspondientes. 