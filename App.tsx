import React, { useContext, useEffect, useState } from 'react';
import AuthContextProvider, {
  AuthContext,
} from './src/context/AuthContextProvider';
import AppNavigator from './src/navigation/AppNavigator';
import { setupI18n } from './src/i18n';
import { TaskContextProvider } from './src/context/TaskContext';
import { ThemeContextProvider } from './src/context/ThemeContext';

// Wrapper component to provide TaskContext only when user is available
const AppWithTasks = () => {
  const { user, loading }: any = useContext(AuthContext);

  // Wait until loading is false
  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <TaskContextProvider user={user}>
      <AppNavigator />
    </TaskContextProvider>
  );
};

// Main App component
export default function App() {
  const [appLanguageready, setAppLangReady] = useState(false);

  // Initialize i18n on app start
  useEffect(() => {
    setupI18n().then(() => setAppLangReady(true));
  }, []);

  // Wait for i18n to be ready before rendering the app
  if (!appLanguageready) return null;
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        {' '}
        {/* // Provide AuthContext to the app */}
        <AppWithTasks /> {/* // App wrapped with TaskContextProvider */}
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}
