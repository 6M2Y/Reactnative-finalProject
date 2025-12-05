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
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

const Register = ({ navigation }: any) => {
  const { register }: any = useContext(AuthContext);
  const { theme }: any = useContext(ThemeContext);
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'parent' | 'child'>('child');
  const [familyCode, setFamilyCode] = useState('');

  const handleRegister = async () => {
    try {
      await register(name, email, password, role, familyCode);
      Toast.show({
        type: 'success',
        text1: `${t('toast.reg')}`,
      });
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert(t('register.error'), error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {t('register.title')}
      </Text>

      {/* NAME */}
      <TextInput
        placeholder={t('register.name')}
        placeholderTextColor={theme.textSecondary}
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      {/* EMAIL */}
      <TextInput
        placeholder={t('register.email')}
        placeholderTextColor={theme.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
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

      {/* PASSWORD */}
      <TextInput
        placeholder={t('register.password')}
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

      {/* ROLE PICKER */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('register.role')}
      </Text>
      <View
        style={[
          styles.pickerContainer,
          { borderColor: theme.border, backgroundColor: theme.card },
        ]}
      >
        <Picker
          selectedValue={role}
          dropdownIconColor={theme.text}
          onValueChange={value => setRole(value)}
          style={{ color: theme.text }}
        >
          <Picker.Item label={t('register.role')} value="Role" />
          <Picker.Item label={t('register.parent')} value="parent" />
          <Picker.Item label={t('register.child')} value="child" />
        </Picker>
      </View>

      {/* FAMILY CODE FOR CHILD */}
      {role === 'child' && (
        <TextInput
          placeholder={t('register.familyCode')}
          placeholderTextColor={theme.textSecondary}
          value={familyCode}
          onChangeText={setFamilyCode}
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
        />
      )}

      {/* REGISTER BUTTON */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.accent }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>{t('register.registerBtn')}</Text>
      </TouchableOpacity>

      {/* GO TO LOGIN */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.link, { color: theme.accent }]}>
          {t('register.loginLink')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },

  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  label: {
    marginBottom: 6,
    fontSize: 15,
    fontWeight: '600',
  },

  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
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

  link: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Register;
