import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopNav = () => {
  // 🔔 Handle profile click
  const handleProfilePress = () => {
    Alert.alert('Profile Clicked', 'You tapped the profile picture.');
  };

  // 📩 Handle notification click
  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'You tapped the notification icon.');
  };

  return (
    <View style={styles.container}>
      {/* App Name */}
      <Text style={styles.appName}>Cash Crop Detector</Text>

      {/* Right side: notification + profile */}
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={handleNotificationPress} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }} // placeholder profile image
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#4CAF50', // green background
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  appName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default TopNav;
