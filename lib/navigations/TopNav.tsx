import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

  // ⏪ Handle Previous click
   const navigation = useNavigation();

  // Handle Previous click
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack(); // ⬅️ go to previous screen
    } else {
      Alert.alert('Info', 'No previous screen found.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
        <Ionicons name="arrow-back-outline" size={26} color="black" />
      </TouchableOpacity>


      {/* Right side: notification + profile */}
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={handleNotificationPress} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={26} color="black" />
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
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  appName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 4,
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
