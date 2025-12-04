import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DatePickerInputProps {
  label: string;
  value: Date;
  onConfirm: (date: Date) => void;
}

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onConfirm,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) onConfirm(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.inputContainer}
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color="#666"
          style={styles.icon}
        />
        <Text style={styles.dateText}>{formatDate(value)}</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#999" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
  },
  icon: { marginRight: 10 },
  dateText: { flex: 1, fontSize: 16, color: '#333' },
});

export default DatePickerInput;
