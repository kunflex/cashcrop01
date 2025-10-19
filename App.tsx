import React, { useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens'; // ← enable screens

import SplashScreen from './lib/SplashScreen';
import DashboardApp from './lib/DashboardApp';
import CropDetails from './lib/screens/CropDetails';
import UserVerification from './lib/components/UserVerification';

enableScreens(); // Important!

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const isDarkMode = useColorScheme() === 'light';

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserVerification"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="UserVerification" component={UserVerification} />
          <Stack.Screen name="DashboardApp" component={DashboardApp} />
          <Stack.Screen name="CropDetails" component={CropDetails} options={{ title: 'Crop Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
