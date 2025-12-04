//----------------------------------------------
//ThemeContext for toggling app theme- dark or light
//this creates global accessiblity
//----------------------------------------------
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

const lightTheme = {
  background: '#F7F7F7',
  card: '#FFFFFF',
  text: '#222',
  textSecondary: '#666',
  border: '#E0E0E0',
  icon: '#333',
  accent: '#4A90E2',
  btnColor_good: '#646967ff',
  btnColor_edit: '#4b84a5ff',
  btnColor_del: '#a54e4bff',
  bar: '#904ba5ff',
};

const darkTheme = {
  background: '#181616ff',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#BBBBBB',
  border: '#333',
  icon: '#DDD',
  accent: '#4A90E2',
  btnColor_good: '#646967ff',
  btnColor_edit: '#4b84a5ff',
  btnColor_del: '#a54e4bff',
  bar: '#904ba5ff',
};

export const ThemeContextProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme == 'dark') setIsDark(true);
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
