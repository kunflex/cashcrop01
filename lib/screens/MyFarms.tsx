import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackParamList, Farm } from '../navigations/types';
import TopNav from '../navigations/TopNav';

const initialFarms: Farm[] = [
  {
    id: '1',
    cropType: 'Tomatoes',
    location: 'Farm A',
    image: require('../assets/images/image.png'),
    activities: {},
  },
  {
    id: '2',
    cropType: 'Maize',
    location: 'Farm B',
    image: require('../assets/images/image.png'),
    activities: {},
  },
  {
    id: '3',
    cropType: 'Cassava',
    location: 'Farm C',
    image: require('../assets/images/image.png'),
    activities: {},
  },
];

const MyFarms: React.FC = () => {
  const [farms] = useState<Farm[]>(initialFarms);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const openFarm = (farm: Farm) => {
    navigation.navigate('ActivityTracker', { farm });
  };

  const goToPostPage = () => {
    navigation.navigate('PostScreen');
  };

  const renderFarmItem: ListRenderItem<Farm> = ({ item }) => (
    <View style={styles.farmCard}>
      <Image source={item.image} style={styles.farmImage} />
      <View style={styles.farmInfo}>
        <Text style={styles.cropType}>{item.cropType}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => openFarm(item)}
        >
          <Text style={styles.openButtonText}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopNav />
      <Text style={styles.heading}>Crop Cultivations</Text>

      <FlatList
        data={farms}
        keyExtractor={item => item.id}
        renderItem={renderFarmItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity style={styles.floatingButton} onPress={goToPostPage}>
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    left: 15,
    color: '#333',
  },
  farmCard: {
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 2,
    overflow: 'hidden',
    elevation: 2,
  },
  farmImage: { width: 100, height: 100 },
  farmInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
  cropType: { fontSize: 18, fontWeight: 'bold' },
  location: { fontSize: 14, color: '#666' },
  openButton: {
    marginTop: 8,
    backgroundColor: '#34a853',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  openButtonText: { color: '#fff', fontWeight: 'bold' },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#34a853',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default MyFarms;
