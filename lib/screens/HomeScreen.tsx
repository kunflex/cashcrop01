import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AdvertPage from '../components/AdvertPage';
import { RootStackParamList } from '../navigations/types';
import SearchBar from '../navigations/SearchBar';
import Header from '../navigations/Header';
import WeatherCard from '../components/WeatherCard';
import axios from 'axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const plantPosts = [
    {
      id: 1,
      name: 'Aloe Vera',
      image: 'https://i.pravatar.cc/100',
      description:
        'Aloe Vera is a succulent plant known for its healing properties.',
      likes: 150,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Seedling → 4–6 weeks: Vegetative → 6–8 weeks: Flowering → 8–12 weeks: Fruit Set → Harvest',
      diseases: 'Root rot, leaf spot',
      pests: 'Aphids, mealybugs',
    },
    {
      id: 2,
      name: 'Snake Plant',
      image: 'https://i.pravatar.cc/100',
      description:
        'An easy-to-grow indoor plant that purifies air efficiently.',
      likes: 230,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Seedling → 4–6 weeks: Vegetative → 6–8 weeks: Flowering → 8–12 weeks: Fruit Set → Harvest',
      diseases: 'Leaf blight',
      pests: 'Spider mites',
    },
    {
      id: 3,
      name: 'Peace Lily',
      image: 'https://i.pravatar.cc/100',
      description:
        'Peace lilies thrive in shade and produce beautiful white blooms.',
      likes: 180,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Seedling → 4–6 weeks: Vegetative → 6–8 weeks: Flowering → 8–12 weeks: Blooming',
      diseases: 'Bacterial leaf spot',
      pests: 'Thrips, aphids',
    },
    {
      id: 4,
      name: 'Cocoa',
      image: 'https://i.pravatar.cc/100?img=4',
      description:
        'Cocoa is cultivated for its beans, which are processed into chocolate and cocoa butter.',
      likes: 340,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Seedling → 4–6 weeks: Vegetative → 6–8 weeks: Flowering → 8–12 weeks: Pod Development → Harvest',
      diseases: 'Black pod, witches’ broom',
      pests: 'Mirids, cocoa pod borer',
    },
    {
      id: 5,
      name: 'Maize',
      image: 'https://i.pravatar.cc/100?img=5',
      description:
        'Maize is a cereal crop used for food, feed, and industrial products.',
      likes: 410,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Seedling → 4–6 weeks: Vegetative → 6–8 weeks: Tasseling → 8–12 weeks: Grain Fill → Harvest',
      diseases: 'Rust, maize streak virus',
      pests: 'Fall armyworm, stem borer',
    },
    {
      id: 6,
      name: 'Rice',
      image: 'https://i.pravatar.cc/100?img=6',
      description:
        'Rice is a staple grain crop grown in flooded paddies across tropical regions.',
      likes: 480,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Tillering → 4–6 weeks: Vegetative → 6–8 weeks: Heading → 8–12 weeks: Grain Maturity → Harvest',
      diseases: 'Blast, bacterial blight',
      pests: 'Planthoppers, stem borers',
    },
    {
      id: 7,
      name: 'Cassava',
      image: 'https://i.pravatar.cc/100?img=7',
      description:
        'Cassava is a starchy root crop that is a major source of carbohydrates.',
      likes: 320,
      lifecycle:
        '1–2 weeks: Sprouting → 2–4 weeks: Vegetative → 4–6 weeks: Root Formation → 6–8 weeks: Enlargement → 8–12 weeks: Maturity → Harvest',
      diseases: 'Mosaic disease, bacterial blight',
      pests: 'Whiteflies, mealybugs',
    },
    {
      id: 8,
      name: 'Tomato',
      image: 'https://i.pravatar.cc/100?img=8',
      description:
        'Tomato is a widely cultivated vegetable crop with high nutritional value.',
      likes: 350,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Seedling → 4–6 weeks: Flowering → 6–8 weeks: Fruit Set → 8–12 weeks: Ripening → Harvest',
      diseases: 'Late blight, leaf curl virus',
      pests: 'Whiteflies, thrips, hornworms',
    },
    {
      id: 9,
      name: 'Groundnut',
      image: 'https://i.pravatar.cc/100?img=9',
      description:
        'Groundnut, also known as peanut, is valued for its oil-rich seeds.',
      likes: 290,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Flowering → 4–6 weeks: Pegging → 6–8 weeks: Pod Formation → 8–12 weeks: Maturity → Harvest',
      diseases: 'Rust, leaf spot',
      pests: 'Aphids, thrips',
    },
    {
      id: 10,
      name: 'Coconut',
      image: 'https://i.pravatar.cc/100?img=10',
      description:
        'Coconut is a perennial tropical crop grown for oil and food products.',
      likes: 370,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Seedling → 4–6 weeks: Vegetative → 6–8 weeks: Flowering → 8–12 weeks: Fruiting → Harvest',
      diseases: 'Bud rot, leaf blight',
      pests: 'Red palm weevil, rhinoceros beetle',
    },
  ];

  const filteredPlants = plantPosts.filter(post =>
    post.name.toLowerCase().includes(search.toLowerCase()),
  );

  const goToDetails = (crop: RootStackParamList['CropDetails']['crop']) => {
    navigation.navigate('CropDetails', { crop });
  };

  interface Weather {
    city: string;
    temperature: number;
    condition: string;
    humidity: number;
    wind: number;
    icon: string;
  }

  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Replace with your OpenWeatherMap API key
        const API_KEY = 'a82a9308f1944790a0423607252010';
        const API_URL = 'http://api.weatherapi.com/v1';
        // Replace 'Accra' with any city you want
        const CITY = 'Accra';
        const response = await axios.get(
          `${API_URL}/current.json?key=${API_KEY}&q=${CITY}&aqi=no`,
        );

        const data = response.data;
        setWeather({
          city: data.location.name,
          temperature: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          humidity: data.current.humidity,
          wind: Math.round(data.current.wind_kph),
          icon: `https:${data.current.condition.icon}`, // WeatherAPI returns a full icon path
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <View style={styles.container}>
        {/* header file */}
        <Header />
        {/* Search Bar */}
        <SearchBar search={search} setSearch={setSearch} />{' '}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* weather */}
          {weather && (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <WeatherCard {...weather} />
            </View>
          )}

          {/* advert */}
          <AdvertPage />
          {/* ✅ Search bar here */}
          <Text style={styles.welcomeText}>
            Discover and learn more about your favorite plants 🌱
          </Text>

          <FlatList
            data={filteredPlants}
            keyExtractor={item => item.id.toString()}
            numColumns={2} // 2 cards per row
            columnWrapperStyle={{ justifyContent: 'space-between' }} // space between columns
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => goToDetails(item)}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <View style={styles.likesRow}>
                    <Ionicons name="heart-outline" size={18} color="#4CAF50" />
                    <Text style={styles.likesText}>{item.likes} likes</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
      </SafeAreaProvider>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  card: {
    flex: 1, // takes available space in the row
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 5, // spacing between columns
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#4CAF50',
  },
  loader: {
    // ✅ Add this style
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
