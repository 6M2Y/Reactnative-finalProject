import React, { useContext, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../context/AuthContextProvider';
import { useTranslation } from 'react-i18next';

const Login = ({ navigation }: any) => {
  const { t } = useTranslation(); //for language translation

  const { login }: any = useContext(AuthContext); // Access login function from context
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    try {
      const user: any = await login(email, password); // Call login function from context

      Alert.alert('User logged in successfully' + JSON.stringify(user));
      /*  navigation.navigate('Home'); // Navigate to Home screen on successful login */
    } catch (error: any) {
      Alert.alert('Login error:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder={t('login.email')}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setEmail}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: 200,
          paddingHorizontal: 10,
        }}
      />
      <TextInput
        placeholder={t('login.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: 200,
          paddingHorizontal: 10,
        }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title={t('login.registerLink')}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default Login;
