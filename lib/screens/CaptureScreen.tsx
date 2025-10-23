import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import TopNav from '../navigations/TopNav';
import axios from 'axios';

// --- Large Cash Crop Dataset ---
const CASH_CROPS = [
  'Maize',
  'Cocoa',
  'Rice',
  'Coffee',
  'Cassava',
  'Sugarcane',
  'Wheat',
  'Cotton',
  'Soybean',
  'Tobacco',
  'Palm',
  'Banana',
  'Tea',
  'Groundnut',
  'Millet',
  'Sorghum',
  'Oil Palm',
  'Rubber',
  'Coconut',
  'Barley',
  'Potato',
  'Tomato',
  'Onion',
  'Yam',
  'Sweet Potato',
  'Citrus',
  'Apple',
  'Grapes',
  'Mango',
  'Pineapple',
  'Pepper',
  'Chili',
  'Papaya',
  'Avocado',
  'Cabbage',
  'Cauliflower',
  'Carrot',
  'Spinach',
  'Lettuce',
  'Strawberry',
  'Blueberry',
  'Gooseberry',
];

const CaptureScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [cropDetails, setCropDetails] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // --- Replace with your Perenual API key ---
  const API_KEY = 'sk-cE7a68f6d5b81a6f713021';
  const API_URL = 'https://perenual.com/api/v2/species-list';

  // Open modal
  const openImageOptions = () => setModalVisible(true);

  // Take photo
  const handleTakePhoto = async () => {
    setModalVisible(false);
    const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets[0].uri)
      handleImageSelected(result.assets[0]);
  };

  // Choose from gallery
  const handleChoosePhoto = async () => {
    setModalVisible(false);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });
    if (result.assets && result.assets[0].uri)
      handleImageSelected(result.assets[0]);
  };

  // Cancel
  const handleCancel = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  // Handle selected image
  const handleImageSelected = (asset: Asset) => {
    setImageUri(asset.uri || null);
    setCropDetails(null);
    if (asset.uri) detectCrop(asset.uri);
  };

  // --- Cash Crop Detection Logic ---
  const detectCrop = async (uri: string) => {
    setDetecting(true);
    try {
      // STEP 1: Send image to PlantNet
      const formData = new FormData();
      formData.append('images', {
        uri,
        type: 'image/jpeg',
        name: 'plant.jpg',
      } as any);

      const plantNetResponse = await axios.post(
        'https://my-api.plantnet.org/v2/identify/all?api-key=2b10yFJ4iJUOnBevcTDkNq4e',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      const suggestions = plantNetResponse.data?.results || [];
      if (!suggestions.length) {
        Alert.alert('No Plant Found', 'Unable to recognize this plant.');
        setDetecting(false);
        return;
      }

      // STEP 2: Extract top plant name
      const detectedPlantName =
        suggestions[0]?.species?.commonNames?.[0] ||
        suggestions[0]?.species?.scientificNameWithoutAuthor ||
        'Unknown';

      // STEP 3: Filter only cash crops
      const isCashCrop = CASH_CROPS.some(
        crop => crop.toLowerCase() === detectedPlantName.toLowerCase(),
      );
      if (!isCashCrop) {
        Alert.alert(
          'Not a Cash Crop',
          `Detected plant "${detectedPlantName}" is not a recognized cash crop.`,
        );
        setDetecting(false);
        setCropDetails(null);
        return;
      }

      // STEP 4: Fetch detailed info from Perenual API
      const response = await axios.get(
        `${API_URL}?key=${API_KEY}&q=${detectedPlantName}`,
      );
      const plant = response.data?.data?.[0];

      if (plant) {
        setCropDetails({
          name: plant.common_name || detectedPlantName,
          scientific: plant.scientific_name || 'N/A',
          cycle: plant.cycle || 'N/A',
          watering: plant.watering || 'N/A',
          sunlight: plant.sunlight?.join(', ') || 'N/A',
          description: plant.description || 'No description available.',
          image: plant.default_image?.original_url || null,
        });
      } else {
        setCropDetails({
          name: detectedPlantName,
          description: 'Plant detected, but no extra info found.',
        });
      }
    } catch (error) {
      console.error('Detection error:', error);
      Alert.alert('Error', 'Failed to detect plant. Please try again.');
    } finally {
      setDetecting(false);
    }
  };

  return (
    <>
      <TopNav />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cash Crop Detection</Text>

        {/* Image Preview */}
        <View style={styles.previewContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="image-outline" size={60} color="#aaa" />
              <Text style={styles.placeholderText}>No Image Selected</Text>
            </View>
          )}
        </View>

        {/* Button to open modal */}
        <TouchableOpacity
          style={styles.selectButton}
          onPress={openImageOptions}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.selectButtonText}>Select Image</Text>
        </TouchableOpacity>

        {/* Loading Spinner */}
        {detecting && (
          <ActivityIndicator
            size="large"
            color="#2e7d32"
            style={{ marginTop: 20 }}
          />
        )}

        {/* Display Results */}
        {cropDetails && (
          <View style={styles.resultContainer}>
            {cropDetails.image && (
              <Image
                source={{ uri: cropDetails.image }}
                style={styles.resultImage}
              />
            )}
            <Text style={styles.resultText}>{cropDetails.name}</Text>
            <Text style={styles.detailText}>
              Scientific: {cropDetails.scientific}
            </Text>
            <Text style={styles.detailText}>Cycle: {cropDetails.cycle}</Text>
            <Text style={styles.detailText}>
              Watering: {cropDetails.watering}
            </Text>
            <Text style={styles.detailText}>
              Sunlight: {cropDetails.sunlight}
            </Text>
            <Text style={[styles.detailText, { marginTop: 10 }]}>
              {cropDetails.description}
            </Text>
          </View>
        )}

        {/* Modal */}
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleTakePhoto}
            >
              <Text style={styles.modalText}>📷 Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleChoosePhoto}
            >
              <Text style={styles.modalText}>🖼️ Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={[styles.modalText, { color: '#f44336' }]}>
                ❌ Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

export default CaptureScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
  },
  previewContainer: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholder: { justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#aaa', marginTop: 10, fontSize: 16 },
  selectButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderRadius: 15,
    marginTop: 20,
    elevation: 2,
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultText: { fontSize: 22, fontWeight: 'bold', color: '#2e7d32' },
  detailText: { fontSize: 16, color: '#333', marginTop: 5 },
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButton: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  modalText: { fontSize: 18, fontWeight: '600' },
  cancelButton: { borderBottomWidth: 0 },
});
