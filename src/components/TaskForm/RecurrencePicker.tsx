//---------------------------------------------------
//
//---------------------------------------------------
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const RecurrencePicker = ({
  value,
  onChange,
  theme,
  translation,
}: any) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {translation('taskForm.recurrence')}
      </Text>

      <View
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={[
            styles.picker,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              color: theme.textSecondary,
            },
          ]}
          dropdownIconColor={theme.text}
        >
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
});
