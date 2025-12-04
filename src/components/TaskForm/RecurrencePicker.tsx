import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const RecurrencePicker = ({ value, onChange }: any) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.label}>Recurrence</Text>

      <View style={styles.pickerBox}>
        <Picker selectedValue={value} onValueChange={onChange}>
          <Picker.Item label="One-time" value="none" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Custom Days" value="custom" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
});
