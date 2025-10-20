import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import TopNav from '../navigations/TopNav';

const CaptureScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [cropType, setCropType] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Open modal to choose source
  const openImageOptions = () => setModalVisible(true);

  const handleTakePhoto = async () => {
    setModalVisible(false);
    const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets[0].uri) {
      handleImageSelected(result.assets[0]);
    }
  };

  const handleChoosePhoto = async () => {
    setModalVisible(false);
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets[0].uri) {
      handleImageSelected(result.assets[0]);
    }
  };

  const handleImageSelected = (asset: Asset) => {
    setImageUri(asset.uri || null);
    setCropType(null);
    detectCrop(asset.uri || '');
  };

  const handleCancel = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  // Simulate crop detection (replace with API call in production)
  const detectCrop = (_uri: string) => {
    setDetecting(true);
    setCropType(null);

    setTimeout(() => {
      setCropType('Aloe Vera'); // Fake detection result
      setDetecting(false);
    }, 2000);
  };

  return (
    <>
    {/* title bar */}
    <TopNav/>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crop Detection</Text>

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

      {/* Open Modal Button */}
      <TouchableOpacity style={styles.selectButton} onPress={openImageOptions}>
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.selectButtonText}>Select Image</Text>
      </TouchableOpacity>

      {/* Detection Spinner */}
      {detecting && (
        <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 20 }} />
      )}

      {/* Detection Result */}
      {cropType && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Detected Crop:</Text>
          <Text style={styles.resultText}>{cropType}</Text>
        </View>
      )}

      {/* Modal Popup */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto}>
            <Text style={styles.modalText}>📷 Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleChoosePhoto}>
            <Text style={styles.modalText}>🖼️ Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={handleCancel}>
            <Text style={[styles.modalText, { color: '#f44336' }]}>❌ Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
    </>
  );
};

export default CaptureScreen;

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
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 16,
  },
  selectButton: {
    flexDirection: 'row',
    backgroundColor: '#4da6ff',
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
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  resultLabel: {
    fontSize: 16,
    color: '#555',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
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
  modalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    borderBottomWidth: 0,
  },
});
