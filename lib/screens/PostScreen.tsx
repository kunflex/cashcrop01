import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostScreen = () => {
  const [postText, setPostText] = useState('');
  const [media, setMedia] = useState(null);

  // Request permissions (Android)
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
        return (
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS automatically asks permission
  };

  // Pick image or video
  const pickMedia = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Please allow access to files and camera.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Media selection failed.');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setMedia(response.assets[0]);
        }
      }
    );
  };

  // Handle post action
  const handlePost = () => {
    if (!postText.trim() && !media) {
      Alert.alert('Empty Post', 'Please type something or attach media.');
      return;
    }
    Alert.alert('Success', 'Your post was created!');
    setPostText('');
    setMedia(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.heading}>Create a New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Write something about your plant..."
        placeholderTextColor="#777"
        multiline
        value={postText}
        onChangeText={setPostText}
      />

      {media && (
        <View style={styles.previewContainer}>
          {media.type?.includes('image') ? (
            <Image source={{ uri: media.uri }} style={styles.previewImage} />
          ) : (
            <Video
              source={{ uri: media.uri }}
              style={styles.previewVideo}
              controls
              resizeMode="cover"
              paused={false}
            />
          )}
          <TouchableOpacity style={styles.removeButton} onPress={() => setMedia(null)}>
            <Ionicons name="close-circle" size={28} color="red" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
        <Ionicons name="image-outline" size={24} color="#fff" />
        <Text style={styles.mediaText}>Add Image / Video</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Ionicons name="send-outline" size={22} color="#fff" />
        <Text style={styles.postText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F9F6', padding: 15 },
  heading: { fontSize: 22, fontWeight: '600', color: '#2E7D32', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    elevation: 2,
    color: '#333',
  },
  previewContainer: { marginTop: 20, alignItems: 'center', position: 'relative' },
  previewImage: { width: '100%', height: 250, borderRadius: 15 },
  previewVideo: { width: '100%', height: 250, borderRadius: 15 },
  removeButton: { position: 'absolute', top: 10, right: 10 },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 20,
  },
  mediaText: { color: '#fff', fontSize: 16, marginLeft: 10, fontWeight: '600' },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 25,
  },
  postText: { color: '#fff', fontSize: 16, marginLeft: 10, fontWeight: '600' },
});
