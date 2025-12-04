import { createStackNavigator } from '@react-navigation/stack';
import ChildLocationScreen from '../screens/ChildLocationScreen';
import ChildLocationMap from '../screens/ChildLocationMap';
import AddChildScreen from '../screens/AddChildScreen';

const Stack = createStackNavigator();

export const FamilyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="childrenLocation" component={ChildLocationScreen} />
      <Stack.Screen name="childLocationMap" component={ChildLocationMap} />
      <Stack.Screen name="AddChild" component={AddChildScreen} />
    </Stack.Navigator>
  );
};
