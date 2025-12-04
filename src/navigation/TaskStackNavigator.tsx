import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from '../screens/Tasks/TaskListScreen';
import TaskDetailScreen from '../screens/Tasks/TaskDetailScreen';
import TaskFormScreen from '../screens/Tasks/TaskFormScreen';

const TaskStack = createStackNavigator();

export default function TaskStackNavigator() {
  return (
    <TaskStack.Navigator>
      <TaskStack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{ title: 'TaskList' }}
      />
      <TaskStack.Screen
        name="TaskDetails"
        component={TaskDetailScreen}
        options={{ title: 'TaskDetails' }}
      />
      <TaskStack.Screen
        name="TaskForm"
        component={TaskFormScreen}
        options={{ title: 'TaskForm' }}
      />
    </TaskStack.Navigator>
  );
}
