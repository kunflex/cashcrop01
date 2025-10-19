/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';

type RootStackParamList = {
  UserVerification: undefined;
  DashboardApp: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserVerification'
>;

const UserVerification: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{ flex: 1 }}>
      {showLogin ? (
        <LoginScreen
          onLogin={(email, password) => {
            console.log('Logged in:', email);
            navigation.navigate('DashboardApp'); // simple, works
          }}
          onNavigateToRegister={() => setShowLogin(false)}
        />
      ) : (
        <RegisterScreen
          onRegister={(email, password) => {
            console.log('Registered:', email);
            // Navigate to DashboardApp using router
            navigation.navigate('DashboardApp');
          }}
          onNavigateToLogin={() => setShowLogin(true)}
        />
      )}
    </View>
  );
};

export default UserVerification;
