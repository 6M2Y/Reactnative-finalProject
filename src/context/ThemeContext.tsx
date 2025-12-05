//----------------------------------------------
//ThemeContext for toggling app theme- dark or light
//this creates global accessiblity
//----------------------------------------------
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../utils/colors';

export const ThemeContext = createContext(null);

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
