import React, { useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens'; // ← enable screens

import SplashScreen from './lib/SplashScreen';
import DashboardApp from './lib/DashboardApp';
import CropDetails from './lib/pages/CropDetails';
import UserVerification from './lib/components/UserVerification';
import PostScreen from './lib/pages/PostScreen';
import MyFarms from './lib/screens/MyFarms';
import ActivityTracker from './lib/pages/ActivityTracker';
import { RootStackParamList } from './lib/navigations/types';

enableScreens(); // Important!

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          <Stack.Screen name="ActivityTracker">
            {props => (
              <ActivityTracker
                {...props}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="MyFarms" component={MyFarms} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
          <Stack.Screen name="UserVerification" component={UserVerification} />
          <Stack.Screen name="DashboardApp" component={DashboardApp} />
          <Stack.Screen
            name="CropDetails"
            component={CropDetails}
            options={{ title: 'Crop Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
