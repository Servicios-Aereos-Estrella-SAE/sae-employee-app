// app.config.js
import 'dotenv/config'; // Carga variables de un archivo .env si lo usas

export default ({ config }) => {
  return {
    ...config,
    expo: {
      name: "Empleados SAE",
      slug: "sae-empleados",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      newArchEnabled: true,
      splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#303e67"
      },
      ios: {
        supportsTablet: false,
        bundleIdentifier: "com.sae.saeempleados",
        infoPlist: {
          NSFaceIDUsageDescription: "Face ID is used to authenticate the user",
          NSLocationWhenInUseUsageDescription: "Location is required to verify employee attendance at work premises.",
          NSLocationAlwaysAndWhenInUseUsageDescription: "Location is required to verify employee attendance at work premises.",
          NSLocationUsageDescription: "Location is required to verify employee attendance at work premises.",
          UIBackgroundModes: ["location"]
        }
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#093057"
        },
        edgeToEdgeEnabled: true,
        package: "com.sae.saeempleados",
        versionCode: 1,
        permissions: [
          "ACCESS_FINE_LOCATION",
          "ACCESS_COARSE_LOCATION"
        ]
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      extra: {
        eas: {
          projectId: "d685a705-a875-401d-af68-b0344be036fc",
          preview: {
            channel: "preview",
            distribution: "internal",
            android: {
              buildType: "apk"
            }
          },
          env: {
            SAE_EMPLOYEEAPP_API_URL: process.env.SAE_EMPLOYEEAPP_API_URL,
            SAE_EMPLOYEEAPP_AUTHENTICATION_KEY: process.env.SAE_EMPLOYEEAPP_AUTHENTICATION_KEY,
            SAE_EMPLOYEEAPP_AUTHENTICATION_USER_KEY: process.env.SAE_EMPLOYEEAPP_AUTHENTICATION_USER_KEY,
            SAE_EMPLOYEEAPP_THEME_STORAGE_KEY: process.env.SAE_EMPLOYEEAPP_THEME_STORAGE_KEY
          }
        },
        SAE_EMPLOYEEAPP_API_URL: process.env.SAE_EMPLOYEEAPP_API_URL,
        SAE_EMPLOYEEAPP_AUTHENTICATION_KEY: process.env.SAE_EMPLOYEEAPP_AUTHENTICATION_KEY,
        SAE_EMPLOYEEAPP_AUTHENTICATION_USER_KEY: process.env.SAE_EMPLOYEEAPP_AUTHENTICATION_USER_KEY,
        SAE_EMPLOYEEAPP_THEME_STORAGE_KEY: process.env.SAE_EMPLOYEEAPP_THEME_STORAGE_KEY
      },
      owner: "wilvardosae",
      runtimeVersion: {
        policy: "appVersion"
      },
      updates: {
        url: "https://u.expo.dev/d685a705-a875-401d-af68-b0344be036fc",
        enabled: true,
        fallbackToCacheTimeout: 0,
        checkAutomatically: "ON_LOAD"
      }
    }
  };
};
