import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ username = 'Rodulf' }) => {
  // 🔔 Handle profile click
  const handleProfilePress = () => {
    Alert.alert('Profile Clicked', 'You tapped the profile picture.');
  };

const today = new Date();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayName = weekdays[today.getDay()]; // e.g., Sunday
const day = String(today.getDate()).padStart(2, '0'); // e.g., 02
const month = months[today.getMonth()]; // e.g., Dec
const year = today.getFullYear(); // e.g., 2024
const formattedDate = `${dayName}, ${day} ${month} ${year}`; 
// "Sunday, 02 Dec 2024"


  // 📩 Handle notification click
  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'You tapped the notification icon.');
  };

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfilePress}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }} // placeholder profile image
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <View style={styles.deluser}>
        {/* App Title (Prop-based, with fallback) */}
        <Text style={styles.appName}>Hello {username}!</Text>
        <Text>{formattedDate}</Text>
      </View>

      {/* Right side: notification + profile */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={handleNotificationPress}
          style={styles.iconButton}
        >
          <Ionicons name="notifications-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:4,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  deluser:{
    flex:1,
    paddingLeft:10,
    alignContent:'flex-start'
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
    backgroundColor: '#eaecea',
    borderRadius: 50,
    padding: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
});

export default Header;
