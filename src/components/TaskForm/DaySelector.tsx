import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const DaySelector = ({ selectedDays, toggleDay }: any) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.label}>Choose Days</Text>

      <View style={styles.days}>
        {DAYS.map(day => (
          <TouchableOpacity
            key={day}
            onPress={() => toggleDay(day)}
            style={[
              styles.dayBtn,
              selectedDays.includes(day) && styles.daySelected,
            ]}
          >
            <Text>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 4,
    backgroundColor: '#f4f4f4',
  },
  daySelected: {
    backgroundColor: '#dfe6e9',
    borderColor: '#2d3436',
  },
});
