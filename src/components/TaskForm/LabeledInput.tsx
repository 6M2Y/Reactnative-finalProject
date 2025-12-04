import { StyleSheet, Text, TextInput, View } from 'react-native';

export const LabeledInput = ({ label, value, onChangeText, ...props }: any) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        {...props}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});
