import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import TopNav from '../navigations/TopNav';
import { RootStackParamList } from '../navigations/types';

const PostScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [cropType, setCropType] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);

  // ✅ Image picker
  const pickImage = async () => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      };
      const result = await launchImageLibrary(options);

      if (result.didCancel) return;
      if (result.assets && result.assets.length > 0) {
        const selected = result.assets[0];
        if (selected.uri) setImage(selected.uri);
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
      Alert.alert('Error', 'Could not open image gallery.');
    }
  };

  // ✅ Submit farm details
  const submitFarmDetails = () => {
    if (!cropType || !location || !image) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    // Placeholder farm data (ready to send to backend later)
    const farmData = {
      id: Date.now().toString(),
      cropType,
      location,
      image,
      activities: {},
    };

    console.log('✅ Farm Data:', farmData);

    Alert.alert('Success', 'Farm details submitted!', [
      { text: 'OK', onPress: () => navigation.navigate('MyFarms') },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* ✅ Custom Header */}
      <TopNav />

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Add Farm Details</Text>

        {/* Crop Type Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Crop Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter crop type"
            value={cropType}
            onChangeText={setCropType}
          />
        </View>

        {/* Location Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter farm location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Image Picker */}
        <Text style={styles.label}>Farm Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text>Select Image</Text>
          )}
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={submitFarmDetails}>
          <Text style={styles.buttonText}>Submit Farm Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#333' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imagePicker: {
    backgroundColor: '#e0e0e0',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  button: {
    backgroundColor: '#34a853',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 40,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default PostScreen;
