import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../context/AuthContextProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { changeAppLanguage } from '../i18n';
import { useTranslation } from 'react-i18next';
import { useFamilyMembers } from '../hooks/useFamilyMembers';
import { ThemeContext } from '../context/ThemeContext';

const SettingScreen = () => {
  const { user, logout }: any = useContext(AuthContext);
  const { isDark, toggleTheme, theme }: any = useContext(ThemeContext);
  const [language, setLanguage] = useState<'en' | 'no'>('en');
  const { members, loading } = useFamilyMembers(user?.familyCode); //get family member and loading from the hook

  //translation hook
  const { t } = useTranslation();

  //handle language change
  const handleLanguage = (lang: 'en' | 'no') => {
    setLanguage(lang);
    changeAppLanguage(lang);
  };

  //if user is null, return
  if (!user) {
    return null;
  }

  return (
    <ScrollView>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          {t('settings.title')}
        </Text>

        {/* PROFILE CARD */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            {t('settings.profile')}
          </Text>

          <View style={styles.profileRow}>
            <View>
              <Text style={[styles.text, { color: theme.textSecondary }]}>
                {t('settings.name')}: {user.name}
              </Text>
              <Text style={[styles.text, { color: theme.textSecondary }]}>
                {t('settings.email')}: {user.email}
              </Text>

              {user.role === 'parent' && (
                <>
                  <Text style={[styles.text, { color: theme.textSecondary }]}>
                    {t('settings.members')}:
                  </Text>

                  {loading ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    members.map(m => (
                      <Text
                        key={m._id}
                        style={[
                          styles.memberText,
                          { color: theme.textSecondary },
                        ]}
                      >
                        <Ionicons name="person" size={14} /> {m.name} - ⭐{' '}
                        {m.points}
                      </Text>
                    ))
                  )}
                </>
              )}

              {user.role === 'child' && (
                <Text style={{ color: theme.textSecondary }}>
                  Your Points: ⭐ {user.point}
                </Text>
              )}
            </View>

            <Image
              source={
                user?.avatarUrl
                  ? { uri: user.avatarUrl }
                  : require('../assets/images/avatar1.png')
              }
              style={styles.avatar}
            />
          </View>
        </View>

        {/* LANGUAGE */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            {t('settings.language')}
          </Text>

          <View style={styles.langRow}>
            <Text
              style={[
                styles.langOption,
                language === 'en' && styles.langActive,
              ]}
              onPress={() => handleLanguage('en')}
            >
              EN
            </Text>
            <Text
              style={[
                styles.langOption,
                language === 'no' && styles.langActive,
              ]}
              onPress={() => handleLanguage('no')}
            >
              NO
            </Text>
          </View>
        </View>

        {/* THEME */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Theme
          </Text>

          <View style={styles.toggleRow}>
            <Text style={[styles.memberText, { color: theme.textSecondary }]}>
              {isDark ? t('settings.theme') : t('settings.theme')}
            </Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* BUTTONS */}
        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: theme.btnColor_good }]}
          onPress={logout}
        >
          <Text style={styles.logoutText}>{t('settings.logout')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteBtn, { backgroundColor: theme.btnColor_del }]}
          onPress={() => Alert.alert('Account Deleted')}
        >
          <Text style={styles.logoutText}>{t('settings.deleteUser')}</Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>FamilyFlow v1.0</Text>
          <Text style={styles.footerText}>© 2025 Developed by GrayMan</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 10,
    color: '#333',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },

  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  text: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },

  memberText: {
    marginLeft: 20,
    color: '#555',
    marginBottom: 4,
  },

  langRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  langOption: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: '#EEE',
    marginHorizontal: 6,
    fontSize: 15,
    color: '#555',
  },

  langActive: {
    backgroundColor: '#5A67D8',
    color: 'white',
    fontWeight: '700',
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  logoutBtn: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
  },

  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },

  deleteBtn: {
    marginTop: 10,

    paddingVertical: 14,
    borderRadius: 10,
  },

  footer: {
    alignItems: 'center',
    marginTop: 40,
  },

  footerText: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
});
export default SettingScreen;
