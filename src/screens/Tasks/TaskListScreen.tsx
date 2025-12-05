//------------------------------------------------------------------------------
// TaskListScreen.tsx gets tasks from global state managed by TaskContext
// Again the task data is fethced either from global state or passed via navigation
// It displays a list of tasks and allows navigation to task details or task form, for parents to add tasks
// Alså the tasks or mytask bottom tab navigates here
//----------------------------------------------------------------------------

import { useCallback, useContext, useMemo } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AuthContext } from '../../context/AuthContextProvider';
import { TaskCard } from '../../components/Cards/TaskCard';
import { useTaskContext } from '../../context/TaskContext';
import { useTaskStat } from '../../hooks/useTaskStat';
import { ThemeContext } from '../../context/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';

export default function TaskListScreen({ route, navigation }: any) {
  const { user }: any = useContext(AuthContext); //get user from auth context
  const { tasks, fetchTasks, loading }: any = useTaskContext(); //get tasks from global state

  const filter = route.params?.filter || null; // Get filter passed via navigation
  const title = route.params?.title || null; // Get title passed via navigation

  const { theme } = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  //get computed task stats using custom hook
  const {
    myTasks,
    unAssignedTasks,
    waitingApprovalTasks,
    overdueDate,
    tasksDueIn3Days,
  } = useTaskStat(tasks, user);

  //computed filtered tasks based on filter
  const filteredTasks = useMemo(() => {
    if (!filter) {
      // No filter applied means it is from bottom tab navigation
      if (user?.role === 'child') {
        //for child show only assigned tasks
        return tasks.filter((task: any) => task.assignedTo?._id === user._id);
      }
      return tasks; //for parent show all tasks
    }
    // Apply filter if provided, from home screen
    switch (filter) {
      case 'myTasks':
        return myTasks;
      case 'unassigned':
        return unAssignedTasks;
      case 'approval':
        return waitingApprovalTasks;
      case 'overdue':
        return overdueDate;
      case 'due3Days':
        return tasksDueIn3Days;
      default:
        return tasks;
    }
  }, [tasks, filter, user]);

  //if not logged in
  if (!user) return null;

  //if no tasks available
  if (filteredTasks.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16 }}>
          {user.role === 'parent'
            ? 'No tasks available yet. Create now'
            : 'No task is assigned to you! Lucky you are :)'}
        </Text>
        {user.role === 'parent' && (
          <Button
            title="Add a Task"
            onPress={() => navigation.navigate('TaskForm')}
          />
        )}
      </View>
    );
  }

  return (
    //loading activity indicator
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.textSecondary }]}>
        {title || (user?.role === 'parent' ? 'Family Tasks' : 'My Tasks')}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TaskCard
              item={item}
              onPress={() =>
                navigation.navigate('TaskDetails', { taskId: item._id })
              }
            />
          )}
        />
      )}

      {/* only parents can add or create tasks */}
      {user.role === 'parent' && (
        <Button
          title="Add Task"
          onPress={() => navigation.navigate('TaskForm')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  taskCard: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  taskTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  taskSub: { fontSize: 14, color: '#666', marginTop: 4 },
  taskStatus: { fontSize: 14, color: '#388E3C', marginTop: 6 },
});
