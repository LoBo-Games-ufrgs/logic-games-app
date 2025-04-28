import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import QueensScreen from '../screens/QueensScreen/QueensScreen';

export type RootStackParamList = {
  Home: undefined;
  Queens: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Queens" component={QueensScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
