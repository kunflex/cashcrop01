import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  condition,
  humidity,
  wind,
  icon,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Left Info */}
        <View style={styles.leftInfo}>
          <Text style={styles.city}>{city}</Text>
          <Text style={styles.temperature}>{temperature}°C</Text>
          <Text style={styles.condition}>{condition}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.info}>💧 Humidity: {humidity}%</Text>
            <Text style={styles.info}>💨 Wind: {wind} km/h</Text>
          </View>
        </View>

        {/* Right Icon */}
        <Image source={{ uri: icon }} style={styles.icon} />
      </View>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#367e38',
    borderRadius: 15,
    marginVertical: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftInfo: {
    flex: 1,
  },
  city: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  condition: {
    fontSize: 16,
    color: '#f0f0f0',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15, // spacing between humidity and wind
  },
  info: {
    fontSize: 14,
    color: '#f0f0f0',
  },
  icon: {
    width: 140,
    height: 90,
  },
});
