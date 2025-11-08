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
      name: 'Cocoa',
      image: 'https://media.istockphoto.com/id/1470083042/photo/cacao-plant.jpg?s=1024x1024&w=is&k=20&c=3ZCzbyzKADv45vUDi13LRv61KzyipGKUqJXab4jPWmY=',
      description:
        "Cocoa is Ghana's primary cash crop, used for chocolate production.",
      likes: 450,
      lifecycle:
        '1–3 months: Germination → 6–12 months: Seedling → 3–5 years: Flowering & Pod formation → 5–6 years: Full production',
      cultivationtips:
        'Plant in humid tropical climate with shade trees; maintain soil fertility and prune regularly.',
      uses: 'Chocolate, cocoa powder, cocoa butter.',
      diseases: 'Black pod disease, swollen shoot virus',
      pests: 'Mirids, mealybugs',
    },
    {
      id: 2,
      name: 'Oil Palm',
      image: 'https://cdn.pixabay.com/photo/2014/03/15/17/03/oil-palm-287902_640.jpg',
      description:
        'Oil Palm produces palm oil widely used in foods and cosmetics.',
      likes: 420,
      lifecycle:
        '0–6 months: Seedling → 3–4 years: First fruiting → 25–30 years: Productive palms',
      cultivationtips:
        'Plant in fertile, well-drained soils; irrigate moderately and prune fronds.',
      uses: 'Palm oil for cooking, soap, and biofuel.',
      diseases: 'Bud rot, Ganoderma basal stem rot',
      pests: 'Rhinoceros beetle, weevils',
    },
    {
      id: 3,
      name: 'Cashew',
      image: 'https://media.istockphoto.com/id/518856308/photo/cashew-fruit-hanging-on-tree.jpg?s=1024x1024&w=is&k=20&c=zYoq-bKItiSILDUsgySeZ9tkjhcIZZwLYgN00sB873s=',
      description: 'Cashew nuts are exported for snack and oil production.',
      likes: 380,
      lifecycle:
        '0–2 months: Germination → 3–12 months: Seedling → 3–5 years: Flowering → 5–7 years: Fruiting → Harvest',
      cultivationtips:
        'Grow in well-drained sandy soils; prune trees for sunlight penetration.',
      uses: 'Nuts, cashew apple juice, oil.',
      diseases: 'Anthracnose, powdery mildew',
      pests: 'Tea mosquito bug, aphids',
    },
    {
      id: 4,
      name: 'Rubber',
      image: 'https://cdn.pixabay.com/photo/2018/06/16/20/25/plant-3479460_1280.jpg',
      description:
        'Rubber trees are tapped for latex used in various products.',
      likes: 360,
      lifecycle:
        '0–6 months: Nursery → 5–7 years: Tapping begins → 25–30 years: Productive lifespan',
      cultivationtips:
        'Plant in humid, well-drained soils; proper spacing and fertilization are required.',
      uses: 'Latex, tires, gloves, industrial products.',
      diseases: 'Leaf blight, powdery mildew',
      pests: 'Mealybugs, lace bugs',
    },
    {
      id: 5,
      name: 'Maize',
      image: 'https://media.istockphoto.com/id/1133692494/photo/corn-cob-with-green-leaves-growth-in-agriculture-field-outdoor.jpg?s=612x612&w=0&k=20&c=xFYeDDO46cJ73fXEvqt0NFV6mSugjXoDAxdBNqno9Ac=',
      description: 'Maize is a staple cereal crop and cash crop in Ghana.',
      likes: 500,
      lifecycle:
        '0–2 weeks: Germination → 2–6 weeks: Vegetative growth → 6–10 weeks: Flowering → 10–14 weeks: Maturity → Harvest',
      cultivationtips:
        'Plant in fertile soils; rotate crops; control weeds and pests.',
      uses: 'Food, livestock feed, processed foods.',
      diseases: 'Maize streak virus, rust',
      pests: 'Armyworms, stem borers',
    },
    {
      id: 6,
      name: 'Rice',
      image: 'https://media.istockphoto.com/id/622925154/photo/ripe-rice-in-the-field-of-farmland.jpg?s=612x612&w=0&k=20&c=grtA7L3dm_SP80Fdt-PpIwu5GYacZygErTDUDNIKHwY=',
      description: 'Rice is cultivated in Ghana mainly in irrigated lowlands.',
      likes: 480,
      lifecycle:
        '0–3 weeks: Germination → 3–6 weeks: Seedling → 6–12 weeks: Tillering → 12–16 weeks: Flowering → 16–20 weeks: Ripening → Harvest',
      cultivationtips:
        'Maintain flooded fields, control weeds, and fertilize appropriately.',
      uses: 'Food, rice bran oil, animal feed.',
      diseases: 'Rice blast, sheath blight',
      pests: 'Rice weevil, stem borers',
    },
    {
      id: 7,
      name: 'Yam',
      image: 'https://media.istockphoto.com/id/1344941660/photo/different-grade-of-sweet-potato-growing-white-and-purple-sweet-potato.jpg?s=612x612&w=0&k=20&c=Sp8Q8ygjcqgvrY_TqzrPXDV9l3nR6qK-bVm6CbecOzk=',
      description: 'Yam is a tuber crop widely grown for food and trade.',
      likes: 400,
      lifecycle:
        '0–2 weeks: Sprouting → 3–6 weeks: Vegetative growth → 7–20 weeks: Tuber formation → Harvest',
      cultivationtips:
        'Requires mounds/ridges for planting; irrigate moderately; weed control is essential.',
      uses: 'Food, flour, chips.',
      diseases: 'Yam mosaic virus, anthracnose',
      pests: 'Yam beetle, nematodes',
    },
    {
      id: 8,
      name: 'Cassava',
      image: 'https://media.istockphoto.com/id/179038063/photo/tapioca-plants-cassava.jpg?s=612x612&w=0&k=20&c=qjrUxHsFu66b0GWsaYMpudkHz7IYU04YTPHypQLOcYU=',
      description:
        'Cassava is a starchy root crop grown for food and cash income.',
      likes: 420,
      lifecycle:
        '0–1 months: Germination → 3–6 months: Vegetative growth → 6–12 months: Root development → Harvest',
      cultivationtips:
        'Plant in well-drained soils; tolerate drought; remove weeds regularly.',
      uses: 'Flour, gari, tapioca, animal feed.',
      diseases: 'Cassava mosaic virus, bacterial blight',
      pests: 'Cassava mites, whiteflies',
    },
    {
      id: 9,
      name: 'Groundnut',
      image: 'https://media.istockphoto.com/id/532971254/photo/peanut.jpg?s=612x612&w=0&k=20&c=xkKnkAPohuhFzdnR73YEKZcyqgqefML-0Gxe_a2uy3U=',
      description: 'Groundnut is a legume grown for edible seeds and oil.',
      likes: 350,
      lifecycle:
        '0–2 weeks: Germination → 2–6 weeks: Vegetative growth → 6–10 weeks: Flowering → 10–14 weeks: Pod development → Harvest',
      cultivationtips:
        'Plant in sandy loam soils; irrigate moderately; remove weeds.',
      uses: 'Peanut butter, oil, snacks, animal feed.',
      diseases: 'Leaf spot, rust',
      pests: 'Leaf miners, root-knot nematodes',
    },
    {
      id: 10,
      name: 'Shea',
      image: 'https://media.istockphoto.com/id/478735081/photo/shea-nuts-and-leaves.jpg?s=612x612&w=0&k=20&c=6AuPSrzwOJAkUNX8qDlYyCq54l4PMzEgmHKHsH6AZmY=',
      description: 'Shea nuts are harvested for butter production.',
      likes: 370,
      lifecycle:
        '0–6 months: Seedling → 4–5 years: Flowering → 15–20 years: Fruit production → Harvest',
      cultivationtips:
        'Grow in savannah regions; minimal irrigation needed; prune for sunlight.',
      uses: 'Shea butter, cosmetics, cooking.',
      diseases: 'Anthracnose, fungal leaf spot',
      pests: 'Fruit beetles, caterpillars',
    },
    {
      id: 11,
      name: 'Sorghum',
      image: 'https://media.istockphoto.com/id/1284394529/photo/ripe-milo-grain-heads-park-county-indiana.jpg?s=612x612&w=0&k=20&c=pchDlSvCfukbCfi_NW6mnLMJoaBwX1RTjdyJKlKn7A4=',
      description: 'Sorghum is drought-tolerant and grown for food and fodder.',
      likes: 320,
      lifecycle:
        '0–2 weeks: Germination → 2–6 weeks: Vegetative growth → 7–12 weeks: Flowering → 13–16 weeks: Maturity → Harvest',
      cultivationtips:
        'Plant in dry areas; ensure proper spacing and fertilization.',
      uses: 'Food, syrup, animal feed, biofuel.',
      diseases: 'Anthracnose, grain mold',
      pests: 'Stem borers, aphids',
    },
    {
      id: 12,
      name: 'Millet',
      image: 'https://media.istockphoto.com/id/2075867321/photo/raw-ripe-millet-crops-in-the-field-agriculture-landscape-view.jpg?s=612x612&w=0&k=20&c=t3BODGroageuwC_ocle5B0LLjaIiJIK42-cIEBsNhw8=',
      description:
        'Millet is grown in arid northern regions for food and fodder.',
      likes: 310,
      lifecycle:
        '0–2 weeks: Germination → 3–6 weeks: Vegetative growth → 7–10 weeks: Flowering → 11–14 weeks: Maturity → Harvest',
      cultivationtips:
        'Requires light soil, minimal irrigation; weed control important.',
      uses: 'Food, porridge, animal feed.',
      diseases: 'Blast, downy mildew',
      pests: 'Aphids, stem borers',
    },
    {
      id: 13,
      name: 'Plantain',
      image: 'https://media.istockphoto.com/id/922094380/photo/bananas.jpg?s=612x612&w=0&k=20&c=rn2ufKeLZf3wAUmNUKBi6md-U1gQI4_1038v-VUT3JE=',
      description: 'Plantain is a staple fruit crop and cash crop in Ghana.',
      likes: 400,
      lifecycle:
        '0–1 month: Planting → 3–6 months: Vegetative growth → 9–12 months: Flowering → 12–18 months: Fruit development → Harvest',
      cultivationtips:
        'Plant in fertile soils with irrigation; protect from strong winds.',
      uses: 'Food, chips, desserts.',
      diseases: 'Panama disease, bunchy top virus',
      pests: 'Nematodes, banana weevil',
    },
    {
      id: 14,
      name: 'Tomato',
      image: 'https://media.istockphoto.com/id/1299586597/photo/indeterminate-tomato-plants-growing-outside-in-uk.jpg?s=612x612&w=0&k=20&c=XqvpohIQda3X_uqf2GLh_CwUKJAN3SYgqF2Hlo8thSM=',
      description: 'Tomato is grown for local consumption and export.',
      likes: 350,
      lifecycle:
        '1–2 weeks: Germination → 2–4 weeks: Seedling → 4–6 weeks: Flowering → 6–8 weeks: Fruit Set → 8–12 weeks: Ripening → Harvest',
      cultivationtips:
        'Requires full sun, staking, regular watering, and pest control.',
      uses: 'Sauces, soups, salads, juices.',
      diseases: 'Late blight, leaf curl virus',
      pests: 'Whiteflies, thrips, hornworms',
    },
    {
      id: 15,
      name: 'Pepper',
      image: 'https://media.istockphoto.com/id/1323318476/photo/bell-peppers-tree-in-garden.jpg?s=612x612&w=0&k=20&c=t4q2wqRI9Ljpdv67B4byiWsV-iQQVIyAed1DtZl-55w=',
      description: 'Pepper is grown for spice, consumption, and export.',
      likes: 370,
      lifecycle:
        '0–2 weeks: Germination → 3–6 weeks: Seedling → 6–10 weeks: Flowering → 10–14 weeks: Fruit development → Harvest',
      cultivationtips:
        'Plant in fertile soil with good drainage; support for tall varieties.',
      uses: 'Spices, sauces, culinary use.',
      diseases: 'Bacterial leaf spot, anthracnose',
      pests: 'Aphids, thrips',
    },
    {
      id: 16,
      name: 'Ginger',
      image: 'https://media.istockphoto.com/id/159202960/photo/ginger-plantation.jpg?s=612x612&w=0&k=20&c=SLUkuj2cNFljI076PyuSdGr8KXhTpZFQk05kKA89nzo=',
      description: 'Ginger is a root crop grown for spice and medicinal uses.',
      likes: 330,
      lifecycle:
        '0–2 weeks: Sprouting → 2–4 months: Vegetative growth → 8–10 months: Harvest',
      cultivationtips: 'Plant in loose, well-drained soil; maintain moisture.',
      uses: 'Spices, medicine, tea, export.',
      diseases: 'Rhizome rot, leaf spot',
      pests: 'Nematodes, aphids',
    },
    {
      id: 17,
      name: 'Coconut',
      image: 'https://media.istockphoto.com/id/594911094/photo/green-coconuts-hanging-on-tree.jpg?s=612x612&w=0&k=20&c=Khj4FCMHVOKlxB608c6n70qdZbPCG0SqRWw0SCpOQH4=',
      description:
        'Coconut palms are grown for oil, water, and copra production.',
      likes: 390,
      lifecycle:
        '0–6 months: Seedling → 6–10 years: First fruiting → 60+ years: Productive palms',
      cultivationtips:
        'Plant in sandy soils with good drainage; requires coastal climate.',
      uses: 'Oil, copra, water, fiber.',
      diseases: 'Bud rot, leaf blight',
      pests: 'Rhinoceros beetle, red palm weevil',
    },
    {
      id: 18,
      name: 'Mango',
      image: 'https://cdn.pixabay.com/photo/2020/06/21/19/49/mango-5326518_640.jpg',
      description: 'Mango is grown for fresh fruit and export.',
      likes: 410,
      lifecycle:
        '0–6 months: Seedling → 3–5 years: Flowering → 5–7 years: Fruit production → Harvest',
      cultivationtips:
        'Plant in well-drained soil with adequate sunlight and irrigation.',
      uses: 'Fresh fruit, juice, jams, export.',
      diseases: 'Anthracnose, powdery mildew',
      pests: 'Fruit flies, aphids',
    },
    {
      id: 19,
      name: 'Sweet Potato',
      image: 'https://cdn.pixabay.com/photo/2017/09/24/15/23/batata-2782146_640.jpg',
      description: 'Sweet potato is grown for food and local trade.',
      likes: 340,
      lifecycle:
        '0–2 weeks: Germination → 2–6 weeks: Vegetative growth → 6–12 weeks: Root development → Harvest',
      cultivationtips:
        'Plant in loose soil with moderate irrigation; remove weeds.',
      uses: 'Food, flour, chips.',
      diseases: 'Root rot, leaf spot',
      pests: 'Weevils, nematodes',
    },
    {
      id: 20,
      name: 'Banana',
      image: 'https://cdn.pixabay.com/photo/2024/04/22/15/19/banana-plant-8712877_640.jpg',
      description: 'Banana is a staple fruit crop and cash crop in Ghana.',
      likes: 400,
      lifecycle:
        '0–1 month: Planting → 3–6 months: Vegetative growth → 9–12 months: Flowering → 12–18 months: Fruit development → Harvest',
      cultivationtips:
        'Plant in fertile soil; provide irrigation and protect from wind.',
      uses: 'Food, smoothies, chips, export.',
      diseases: 'Panama disease, banana bunchy top virus',
      pests: 'Nematodes, banana weevil',
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
