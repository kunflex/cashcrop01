import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language] = useState('English');

  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleDarkMode = () => setDarkModeEnabled(prev => !prev);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account deleted!') },
      ]
    );
  };

  const handleChangePassword = () => Alert.alert('Change Password', 'Navigate to change password screen.');
  const handlePrivacyPolicy = () => Alert.alert('Privacy Policy', 'Show privacy policy.');
  const handleTerms = () => Alert.alert('Terms & Conditions', 'Show terms and conditions.');
  const handleAboutApp = () => Alert.alert('About', 'This is CashRop app. Version 1.0.0');
  const handleChangeLanguage = () => Alert.alert('Language', 'Navigate to language selection.');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>Settings</Text>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
          <View style={styles.itemLeft}>
            <Ionicons name="lock-closed-outline" size={22} color="#4CAF50" />
            <Text style={styles.itemText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleDeleteAccount}>
          <View style={styles.itemLeft}>
            <Ionicons name="trash-outline" size={22} color="#E53935" />
            <Text style={[styles.itemText, { color: '#E53935' }]}>Delete Account</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Ionicons name="notifications-outline" size={22} color="#4CAF50" />
            <Text style={styles.itemText}>Enable Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Ionicons name="moon-outline" size={22} color="#4CAF50" />
            <Text style={styles.itemText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.item} onPress={handleChangeLanguage}>
          <View style={styles.itemLeft}>
            <Ionicons name="language-outline" size={22} color="#4CAF50" />
            <Text style={styles.itemText}>Language</Text>
          </View>
          <Text style={styles.value}>{language}</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <TouchableOpacity style={styles.item} onPress={handleAboutApp}>
          <View style={styles.itemLeft}>
            <Ionicons name="information-circle-outline" size={22} color="#4CAF50" />
            <Text style={styles.itemText}>About the App</Text>
          </View>
          <Text style={styles.value}>v1.0.0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handlePrivacyPolicy}>
          <View style={styles.itemLeft}>
            <Ionicons name="document-text-outline" size={22} color="#4CAF50" />
            <Text style={styles.itemText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleTerms}>
          <View style={styles.itemLeft}>
            <Ionicons name="reader-outline" size={22} color="#4CAF50" />
            <Text style={styles.itemText}>Terms & Conditions</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
