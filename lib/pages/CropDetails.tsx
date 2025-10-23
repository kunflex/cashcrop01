import React, { useState } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigations/types';
import CropLifecycle from '../navigations/CropLifecycle';
import TopNav from '../navigations/TopNav';

type CropDetailsRouteProp = RouteProp<RootStackParamList, 'CropDetails'>;
const screenWidth = Dimensions.get('window').width;

const CropDetails = () => {
  const route = useRoute<CropDetailsRouteProp>();
  const { crop } = route.params;

  // ✅ Collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    lifecycle: true,
    diseases: false,
    pests: false,
    cultivation: false,
    uses: false,
  });

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!crop) {
    return <Text style={{ padding: 20 }}>No crop data available.</Text>;
  }

  return (
    <>
      <View style={styles.screen}>
        {/* Top Navigation */}
        <TopNav />

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Image source={{ uri: crop.image }} style={styles.cropImage} />
          <Text style={styles.heading}>{crop.name}</Text>

          {/* 🌿 General Info */}
          <View>
            <Text style={styles.subheading}>General Information</Text>
            <Text style={styles.text}>{crop.description}</Text>
          </View>

          {/* 🌱 Lifecycle */}
          <View>
            <Text style={styles.subheading}>Crop Lifecycle</Text>

            {expandedSections.lifecycle && (
              <View style={styles.sectionContent}>
                <CropLifecycle lifecycle={crop.lifecycle} />
              </View>
            )}
          </View>

          {/* 🦠 Diseases */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('diseases')}
          >
            <Text style={styles.sectionTitle}>Diseases & Diagnostics</Text>
            <Ionicons
              name={
                expandedSections.diseases
                  ? 'chevron-up-outline'
                  : 'chevron-down-outline'
              }
              size={20}
              color="#2E7D32"
            />
          </TouchableOpacity>
          {expandedSections.diseases && (
            <View style={styles.sectionContent}>
              {crop.diseases ? (
                crop.diseases.split(',').map((disease, i) => (
                  <Text key={i} style={styles.text}>
                    • {disease.trim()}
                  </Text>
                ))
              ) : (
                <Text style={styles.text}>
                  No disease information available.
                </Text>
              )}
            </View>
          )}

          {/* 🐛 Pest Control */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('pests')}
          >
            <Text style={styles.sectionTitle}>Pest Control</Text>
            <Ionicons
              name={
                expandedSections.pests
                  ? 'chevron-up-outline'
                  : 'chevron-down-outline'
              }
              size={20}
              color="#2E7D32"
            />
          </TouchableOpacity>
          {expandedSections.pests && (
            <View style={styles.sectionContent}>
              {crop.pests ? (
                crop.pests.split(',').map((pest, i) => (
                  <Text key={i} style={styles.text}>
                    • {pest.trim()}
                  </Text>
                ))
              ) : (
                <Text style={styles.text}>
                  No pest control information available.
                </Text>
              )}
            </View>
          )}

          {/* 🌾 Cultivation Tips */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('cultivation')}
          >
            <Text style={styles.sectionTitle}>Cultivation Tips</Text>
            <Ionicons
              name={
                expandedSections.cultivation
                  ? 'chevron-up-outline'
                  : 'chevron-down-outline'
              }
              size={20}
              color="#2E7D32"
            />
          </TouchableOpacity>
          {expandedSections.cultivation && (
            <View style={styles.sectionContent}>
              <Text style={styles.text}>
                • Ensure well-drained soil and regular watering.{'\n'}• Apply
                organic fertilizers every 2 weeks.{'\n'}• Remove weeds early and
                maintain spacing for airflow.
              </Text>
            </View>
          )}

          {/* 🍀 Uses & Benefits */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('uses')}
          >
            <Text style={styles.sectionTitle}>Uses & Benefits</Text>
            <Ionicons
              name={
                expandedSections.uses
                  ? 'chevron-up-outline'
                  : 'chevron-down-outline'
              }
              size={20}
              color="#2E7D32"
            />
          </TouchableOpacity>
          {expandedSections.uses && (
            <View style={styles.sectionContent}>
              <Text style={styles.text}>
                • Provides nutritional and economic value.{'\n'}• Used for food,
                medicine, or industrial production.{'\n'}• Enhances soil
                fertility when intercropped.{'\n'}• Some varieties serve as raw
                materials for biofuels or cosmetics.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default CropDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  cropImage: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#1B5E20',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B5E20',
  },
  sectionContent: {
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
