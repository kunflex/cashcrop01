import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 👈 icon import

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CaptureScreen from '../screens/CaptureScreen';
import PostScreen from '../screens/PostScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // hide header (we already have TopNav)
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // 👇 match icon based on route name
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Capture':
              iconName = focused ? 'camera' : 'camera-outline';
              break;
            case 'Post':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50', // active icon color
        tabBarInactiveTintColor: 'gray', // inactive icon color
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Capture" component={CaptureScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
