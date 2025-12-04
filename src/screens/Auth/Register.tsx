import React, { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../context/AuthContextProvider';
import { Picker } from '@react-native-picker/picker';

const Register = ({ navigation }: any) => {
  const { register }: any = useContext(AuthContext); // Access register function from context
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'parent' | 'child'>('child');
  const [familyCode, setFamilyCode] = useState<String>('');

  const handleRegister = async (): Promise<void> => {
    try {
      await register(name, email, password, role, familyCode);
      Alert.alert('User registered successfully');
      navigation.navigate('Login'); // Navigate to Login screen on successful registration
    } catch (error: any) {
      Alert.alert('Registration error:' + error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: 200,
          paddingHorizontal: 10,
        }}
        value={name}
        onChangeText={setName}
      />
      <Text>Email</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: 200,
          paddingHorizontal: 10,
        }}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: 200,
          paddingHorizontal: 10,
        }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* picker for role selection */}
      <View style={styles.dropDownContainer}>
        <Text>Select your role:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={role} onValueChange={value => setRole(value)}>
            <Picker.Item label="Parent" value="parent" />
            <Picker.Item label="Child" value="child" />
          </Picker>
        </View>
      </View>
      {role === 'child' && (
        <TextInput
          placeholder="Enter family code"
          value={familyCode}
          onChangeText={setFamilyCode}
          style={{ borderWidth: 1, width: 200, marginBottom: 10, padding: 10 }}
        />
      )}
      <Button title="Register" onPress={handleRegister} />
      <Text
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>{' '}
      <Text>Register</Text>{' '}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {},
  pickerContainer: {
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
    borderRadius: 4,
  },
});
export default Register;
