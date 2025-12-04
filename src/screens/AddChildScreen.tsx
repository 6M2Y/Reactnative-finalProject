import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContextProvider';

export default function AddChildScreen({ navigation }: any) {
  const { user, register }: any = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddChild = async () => {
    try {
      await register(name, email, password, 'child', user.familyCode);
      Alert.alert('Child added successfully');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error adding child', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Child</Text>

      <TextInput
        placeholder="Child name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Child email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button title="Create Account" onPress={handleAddChild} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
});
