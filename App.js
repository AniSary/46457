import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { PlacesProvider } from './context/PlacesContext';

export default function App() {
  return (
    <AuthProvider>
      <PlacesProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PlacesProvider>
    </AuthProvider>
  );
}
