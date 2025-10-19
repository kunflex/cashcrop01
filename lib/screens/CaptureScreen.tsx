import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const CaptureScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [plantDetails, setPlantDetails] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const device = useCameraDevice('back');

  useEffect(() => {
    const getPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    };
    getPermission();
  }, []);

  const takePicture = () => {
    if (!device) return;
    setShowCamera(true);
    setModalVisible(false);
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri || null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  const detectPlant = async () => {
    if (!photo) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photo,
        name: 'plant.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch('https://your-plant-detection-api.com/detect', {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = await response.json();
      setPlantDetails(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to detect plant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal Popup */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select an option</Text>
            <TouchableOpacity style={styles.modalButton} onPress={takePicture}>
              <Text style={styles.modalText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.modalText}>Upload from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#FF5252' }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Camera */}
      {showCamera && device && hasPermission && (
        <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      )}

      {/* Image Preview */}
      {photo && !showCamera && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
        </View>
      )}

      {/* Buttons */}
      {photo && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF5252' }]}
            onPress={() => {
              setPhoto(null);
              setPlantDetails(null);
              setModalVisible(true);
            }}
          >
            <Text style={styles.text}>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2196F3' }]}
            onPress={detectPlant}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>Detect</Text>}
          </TouchableOpacity>
        </View>
      )}

      {/* Detection Result */}
      {plantDetails && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Plant Detected:</Text>
          <Text style={styles.resultText}>{JSON.stringify(plantDetails, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

export default CaptureScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '90%',
    height: '70%',
    borderRadius: 12,
    resizeMode: 'contain',
  },
  resultContainer: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 5,
  },
  resultTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  resultText: { fontSize: 14, color: '#333' },
});
