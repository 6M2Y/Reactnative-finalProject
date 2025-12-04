import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import TaskStackNavigator from './TaskStackNavigator';
import { AuthContext } from '../context/AuthContextProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FamilyStackNavigator } from './FamilyStackNavigator';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { user }: any = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          //icon name based on route
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyTasks' || route.name === 'Tasks') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Children') {
            iconName = focused ? 'people' : 'people-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF', // Blue color for active tab
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen
        name={user?.role == 'child' ? 'MyTasks' : 'Tasks'}
        component={TaskStackNavigator}
        // Override tabPress to reset params
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate(user?.role == 'child' ? 'MyTasks' : 'Tasks', {
              screen: 'TaskList',
              params: { tasks: null, title: null }, // You can pass additional params if needed
            });
          },
        })}
      />
      {user?.role === 'parent' && (
        <Tab.Screen name="Children" component={FamilyStackNavigator} />
      )}

      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
