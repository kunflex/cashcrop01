/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width } = Dimensions.get('window');

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        onFinish();
      }, 2000); // splash duration
    });
  }, [fadeAnim, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Using View to wrap Image and Text for better layout */}
      <View style={styles.content}>
        <Image
          source={require('./assets/images/logo_transparent.png')} // replace with your logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Cash Crop Detector</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%',       // responsive width
    height: undefined,
    aspectRatio: 1,     // keep square
    marginBottom: 20,
  },
  title: {
    fontSize: Math.min(width * 0.07, 28), // responsive font
    color: '#2E7D32',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen;
