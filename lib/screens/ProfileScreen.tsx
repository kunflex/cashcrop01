import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import TopNav from '../navigations/TopNav';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // ✅ adjust path to your config
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation: any = useNavigation();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // ✅ Get the currently logged-in user's email
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await signOut(auth);
            Alert.alert(
              'Logged out!',
              'You have been signed out successfully.'
            );

            // ✅ Redirect to Login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Navigate to edit profile screen.');
  };

  // Sample user data
  const user = {
    name: 'Rudolf Kpobi',
    email: userEmail || 'Loading...', // ✅ use Firebase email
    phone: '+233 50 894 5198',
    address: 'Teshie, Accra, Ghana',
    image: 'https://i.pravatar.cc/100', // placeholder profile image
  };

  return (
    <ScrollView style={styles.container}>
      <TopNav />

      <View
        style={{
          height: 260,
          backgroundColor: '#4CAF50',
          zIndex: 0,
          borderBottomEndRadius: '20%',
          borderBottomStartRadius: '20%',
        }}
      />

      <View style={styles.profileSection}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.welcomeMessage}>Welcome, {user.name}!</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        {Object.entries(user).map(([key, value]) => {
          if (key === 'image' || key === 'name') return null;
          return (
            <View key={key} style={styles.infoRow}>
              <Text style={styles.label}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

// Styles remain unchanged

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  profileSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    marginTop: -90,
  },

  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: 'white',
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: 'transparent',
    borderColor: '#4CAF50',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    maxWidth: '60%',
    textAlign: 'right',
  },
  logoutButton: {
    backgroundColor: '#E53935',
    paddingVertical: 15,
    marginHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
