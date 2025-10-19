import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import BottomNav from './navigations/BottomNav';
import TopNav from './navigations/TopNav';

const DashboardApp = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Top Bar */}
        <TopNav />

        {/* Bottom Bar */}
        <BottomNav />
      </View>
    </SafeAreaProvider>
  );
};

export default DashboardApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
