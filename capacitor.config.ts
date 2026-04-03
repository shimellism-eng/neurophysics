import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neurophysics.app',
  appName: 'NeuroPhysics',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0a0e17',
      showSpinner: false,
      launchAutoHide: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0a0e17',
    },
    Haptics: {},
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0a0e17',
    preferredContentMode: 'mobile',
  },
};

export default config;
