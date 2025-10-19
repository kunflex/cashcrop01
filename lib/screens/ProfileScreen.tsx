import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => Alert.alert('Logged out!') },
    ]);
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Navigate to edit profile screen.');
  };

  // Sample user data
  const user = {
    name: 'Rudolf Kpobi',
    email: 'Rudolf@example.com',
    phone: '+233 50 894 5198',
    address: 'Teshie, Accra, Ghana',
    image: 'https://i.pravatar.cc/100', // placeholder profile image
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Image & Edit Button */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.welcomeMessage}>Welcome, {user.name}!</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        {Object.entries(user).map(([key, value]) => {
          if (key === 'image' || key === 'name') return null; // skip image and name
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

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    marginVertical: 40,
    marginTop:100,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
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
