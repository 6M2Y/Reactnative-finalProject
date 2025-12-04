import { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

export const LabeledInput = ({ label, value, onChangeText, ...props }: any) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
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
