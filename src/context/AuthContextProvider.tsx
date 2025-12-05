//--------------------------------------------------------------
// AuthContextProvider.tsx provides authentication context
// It manages user login, logout, registration, and token storage
//  It uses AsyncStorage to persist user sessions
// It exposes user, token, loading state and auth functions via context
//--------------------------------------------------------------

import React, { createContext, useEffect, useState } from 'react';
import { IUser } from '../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../api/apiClient';
import { loginUser, registerUser } from '../api/userApi';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

interface AuthContextProps {
  user: IUser | null;
  loading: boolean;
  token: string | null;
  login: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const { t } = useTranslation();

  //load user from local  storage
  //auto login if token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken); // Set token state
          setAuthToken(storedToken); // Set token in API client
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Set user state
        }
      } catch (error) {
        console.error('Failed to load user from storage', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  //register user
  const register = async (
    name: string,
    email: string,
    password: string,
    role: 'parent' | 'child',
    familyCode: string,
  ) => {
    await registerUser(name, email, password, role, familyCode);
    Toast.show({
      type: 'success',
      text1: `${t('toast.reg')}`,
      visibilityTime: 4000,
    });
  };

  //login user
  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      console.log('Login response data:', data);
      setUser(data.user); // Set user state
      setToken(data.token); /// Set token state
      setAuthToken(data.token); // Set token in API client
      await AsyncStorage.setItem('user', JSON.stringify(data.user)); // Store user
      await AsyncStorage.setItem('token', data.token); // Store token
      return data.user;
    } catch (error: any) {
      console.error('Request setup error:', error.message);
    }
  };

  //log out user
  useEffect(() => {}, [user]);

  //logout user
  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      setAuthToken(null); // Remove token from API client
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
