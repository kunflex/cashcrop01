import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CropLifecycle = ({ lifecycle }) => {
  // Lifecycle stages with explicit week ranges and approximate duration for bar height
  const lifecycleData = lifecycle
    ? lifecycle.split('→').map((stage, index) => {
        let weekRange = '';
        let duration = 2; // default duration
        switch (index) {
          case 0:
            weekRange = '1-2';
            duration = 2;
            break;
          case 1:
            weekRange = '2-4';
            duration = 2;
            break;
          case 2:
            weekRange = '4-6';
            duration = 2;
            break;
          case 3:
            weekRange = '6-8';
            duration = 2;
            break;
          case 4:
            weekRange = '8-12';
            duration = 4;
            break;
          case 5:
            weekRange = '12-16';
            duration = 4;
            break;
          default:
            weekRange = '1-2';
        }
        return { stage: stage.trim(), weeks: weekRange, duration };
      })
    : [
        { stage: 'Germination', weeks: '1-2', duration: 2 },
        { stage: 'Seedling', weeks: '2-4', duration: 2 },
        { stage: 'Vegetative', weeks: '4-6', duration: 2 },
        { stage: 'Flowering', weeks: '6-8', duration: 2 },
        { stage: 'Fruit Set', weeks: '8-12', duration: 4 },
        { stage: 'Harvest', weeks: '12-16', duration: 4 },
      ];

  const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#F44336'];

  return (
    <View style={styles.graphContainer}>
      {lifecycleData.map((item, index) => (
        <View key={index} style={styles.stageContainer}>
          <View
            style={[
              styles.stageBar,
              { height: item.duration * 20, backgroundColor: colors[index % colors.length] },
            ]}
          />
          <Text style={styles.stageLabel}>{item.stage}</Text>
          <Text style={styles.stageWeeks}></Text>
        </View>
      ))}
    </View>
  );
};

export default CropLifecycle;

const styles = StyleSheet.create({
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
    padding:15,
    borderRadius:10,
    paddingHorizontal: 5,
    backgroundColor:'#fffff',
  },
  stageContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
  },
  stageBar: {
    width: 30,
    borderRadius: 5,
  },
  stageLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  stageWeeks: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },
});
