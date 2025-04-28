import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import AppRoutes from './navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <AppRoutes />
    </GluestackUIProvider>
  );
}