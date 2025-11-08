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
import Ionicons from 'react-native-vector-icons/Ionicons'; // ← icon package
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; // make sure path is correct

interface RegisterScreenProps {
  onRegister: (email: string, password: string) => void;
  onNavigateToLogin: () => void;
}

const { width } = Dimensions.get('window');

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  onNavigateToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Inside handleRegister:
const handleRegister = async () => {
  if (!email || !password || !confirmPassword) {
    Alert.alert('Error', 'Please fill in all fields.');
    return;
  }
  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match.');
    return;
  }

  try {
    // Firebase registration
    await createUserWithEmailAndPassword(auth, email, password);
    Alert.alert("Success", "Account created successfully!");
  } catch (error: any) {
    console.log(error);
    Alert.alert("Registration Error", error.message);
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
        <Text style={styles.title}>Register</Text>

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

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#666"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* Link to Login */}
        <TouchableOpacity onPress={onNavigateToLogin}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
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

export default RegisterScreen;
