/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
 import auth from '@react-native-firebase/auth';
 
interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onNavigateToRegister: () => void;
}

const { width } = Dimensions.get('window');

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);



const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter email and password.');
    return;
  }

  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    Alert.alert('Success', `Welcome back, ${user.email}`);
    onLogin(email, password);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'auth/user-not-found') {
      Alert.alert('Error', 'No user found with that email.');
    } else if (error.code === 'auth/wrong-password') {
      Alert.alert('Error', 'Incorrect password.');
    } else {
      Alert.alert('Error', error.message);
    }
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Login</Text>

        {/* logo */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 30,
          }}
        >
          <Image
            source={require('./assets/images/logo_transparent.png')} // replace with your logo
            style={{
              width: 120,
              height: 120,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#666"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Link to Register */}
        <TouchableOpacity onPress={onNavigateToRegister}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: '8%',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  
  title: {
    fontSize: Math.min(width * 0.08, 28),
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2E7D32',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#2E7D32',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
});

export default LoginScreen;
