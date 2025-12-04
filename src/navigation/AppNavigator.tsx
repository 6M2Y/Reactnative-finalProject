import React, { useContext, useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContextProvider';
import MainTabs from './MainTabs';
import AuthStack from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/OnboardingScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from '../context/ThemeContext';

const stack = createStackNavigator();

export default function AppNavigator() {
  const { user }: any = useContext(AuthContext); // Access user from context
  const [onboardingShown, setonboardingShown] = useState<boolean | null>(null); //to set onboardingsetting
  const { theme, isDark }: any = useContext(ThemeContext);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem('onboardingShown');
      setonboardingShown(value === 'true');
    };
    checkOnboarding();
  }, []);

  // Return a loading screen if onboarding check isn't done yet
  if (onboardingShown === null) return null;

  const navTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      primary: theme.accent,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        {/* CASE 1: Show Onboarding if not shown yet */}
        {!onboardingShown ? (
          <stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : /* CASE 2: Onboarding is done, check Authentication */
        user ? (
          // If user exists, ONLY render MainTabs.
          // This unmounts AuthStack completely.
          <stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          // If user is null, ONLY render AuthStack.
          // This unmounts MainTabs (and HomeScreen) completely, preventing the crash.
          <stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
}
