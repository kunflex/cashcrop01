import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigations/types';
import TopNav from '../navigations/TopNav';
import { BarChart } from 'react-native-chart-kit';

type ActivityTrackerRouteProp = RouteProp<
  RootStackParamList,
  'ActivityTracker'
>;

type Props = {
  route: ActivityTrackerRouteProp;
};

const ActivityTracker: React.FC<Props> = ({ route }) => {
  const { farm } = route.params;

  const [markedDates, setMarkedDates] = useState<Record<string, any>>(
    farm.activities || {},
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0]);

  // 🗓️ When user selects a date
  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setNote(notes[day.dateString] || '');
    setModalVisible(true);

    setMarkedDates(prev => ({
      ...prev,
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: '#34a853',
      },
    }));
  };

  // 💾 Save note + update weekly graph
  const saveNote = () => {
    if (selectedDate) {
      setNotes(prev => ({
        ...prev,
        [selectedDate]: note,
      }));
      setModalVisible(false);
    }
  };

  // 📊 Recalculate weekly data when notes change
  useEffect(() => {
    const updatedWeeklyData = calculateWeeklyActivity(Object.keys(notes));
    setWeeklyData(updatedWeeklyData);
  }, [notes]);

  // 📆 Group selected days by week number of the month
  const calculateWeeklyActivity = (dates: string[]) => {
    const counts = [0, 0, 0, 0, 0]; // assume 5 weeks max per month
    const currentMonth = new Date().getMonth();

    dates.forEach(dateStr => {
      const date = new Date(dateStr);
      if (date.getMonth() === currentMonth) {
        const weekNumber = Math.floor((date.getDate() - 1) / 8); // 0-based week
        counts[weekNumber] += 1;
      }
    });

    return counts;
  };

  return (
    <View style={{ flex: 1 }}>
      <TopNav />

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>
          {farm.cropType} - Daily Activity Tracker
        </Text>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsLabel}>Farm Location:</Text>
          <Text style={styles.detailsValue}>{farm.location}</Text>
        </View>
        {/* 📊 Bar Graph Section */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            Weekly Activity for{' '}
            {new Date().toLocaleString('default', { month: 'long' })}
          </Text>
          <BarChart
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
              datasets: [{ data: weeklyData }],
            }}
            width={Dimensions.get('window').width - 32}
            height={220}
            yAxisLabel=""
            yAxisSuffix="" // ✅ Add this
            chartConfig={{
              backgroundColor: '#f5f5f5',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(52, 168, 83, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '5', strokeWidth: '2', stroke: '#34a853' },
            }}
            style={{ borderRadius: 16, marginVertical:15, }}
          />
        </View>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: '#34a853',
            todayTextColor: '#34a853',
            arrowColor: '#34a853',
            dotColor: '#34a853',
          }}
        />

        {/* 🗒️ Notes Preview */}
        {Object.keys(notes).length > 0 && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>📘 Saved Notes</Text>
            {Object.entries(notes).map(([date, content]) => (
              <View key={date} style={styles.noteCard}>
                <Text style={styles.noteDate}>{date}</Text>
                <Text style={styles.noteContent}>{content}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* ✍️ Add/Edit Note Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Note for {selectedDate}</Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Write your note here..."
              multiline
              style={styles.textInput}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },

  detailsCard: {
    marginTop: 2,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 10,
  },
  detailsLabel: { fontSize: 16, fontWeight: '600', color: '#555' },
  detailsValue: { fontSize: 16, color: '#333', marginTop: 4 },

  chartContainer: { marginTop: 20, alignItems: 'center' },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },

  notesContainer: { marginTop: 20 },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  noteDate: { fontWeight: 'bold', color: '#34a853', marginBottom: 4 },
  noteContent: { fontSize: 15, color: '#333' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelBtn: {
    backgroundColor: '#888',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveBtn: {
    backgroundColor: '#34a853',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default ActivityTracker;
