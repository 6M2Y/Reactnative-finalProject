import React, { useContext, useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { AuthContext } from '../../context/AuthContextProvider';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Login = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { login }: any = useContext(AuthContext); //
  const { theme }: any = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //handle signin
  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      Alert.alert('Login Success', 'Welcome ' + user?.name);
    } catch (error: any) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* TITLE */}
      <Text style={[styles.title, { color: theme.text }]}>FamilyFlow</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {t('login.welcome')}
      </Text>

      {/* EMAIL INPUT */}
      <TextInput
        placeholder={t('login.email')}
        placeholderTextColor={theme.textSecondary}
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      {/* PASSWORD INPUT */}
      <TextInput
        placeholder={t('login.password')}
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.accent }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>{t('login.loginBtn')}</Text>
      </TouchableOpacity>

      {/* REGISTER LINK */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.registerText, { color: theme.accent }]}>
          {t('login.registerLink')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Login;
