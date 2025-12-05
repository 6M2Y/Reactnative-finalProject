import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../context/AuthContextProvider';
import { ThemeContext } from '../context/ThemeContext';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

export default function AddChildScreen({ navigation }: any) {
  const { user, register }: any = useContext(AuthContext);
  const { theme }: any = useContext(ThemeContext);
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddChild = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing fields: Please fill in all fields.',
      });

      return;
    }

    try {
      await register(name, email, password, 'child', user.familyCode);
      Toast.show({
        type: 'success',
        text1: `${t('toast.childreg')} ${name}`,
      });
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Unable to add child');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Add New Child</Text>

      {/* NAME */}
      <TextInput
        placeholder="Child's Name"
        placeholderTextColor={theme.textSecondary}
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      {/* EMAIL */}
      <TextInput
        placeholder="Child's Email"
        placeholderTextColor={theme.textSecondary}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      {/* PASSWORD */}
      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      {/* FAMILY CODE DISPLAY */}
      <Text style={[styles.familyCode, { color: theme.textSecondary }]}>
        Family Code:{' '}
        <Text style={{ color: theme.accent }}>{user.familyCode}</Text>
      </Text>

      {/* BUTTON */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.accent }]}
        onPress={handleAddChild}
      >
        <Text style={styles.buttonText}>Create Child Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, flex: 1, justifyContent: 'center' },

  header: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 25,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  familyCode: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },

  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
