import { useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../components/Cards/StatCard';
import { QuickButton } from '../components/Buttons';
import { useTaskStat } from '../hooks/useTaskStat';
import { useFocusEffect } from '@react-navigation/native';
import { useTaskContext } from '../context/TaskContext';

const HomeScreen = ({ navigation }: any) => {
  const { user }: any = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // ← Now using theme
  const { t } = useTranslation();
  const { tasks, fetchTasks, loading }: any = useTaskContext();

  const {
    myTasks,
    unAssignedTasks,
    waitingApprovalTasks,
    overdueDate,
    tasksDueIn3Days,
  } = useTaskStat(tasks, user);

  useFocusEffect(
    useCallback(() => {
      if (user) fetchTasks();
    }, [user]),
  );

  const taskTabName = user?.role === 'parent' ? 'Tasks' : 'MyTasks';

  const goToTaskList = useCallback(
    (filterValue: any, title: string) => {
      navigation.navigate(taskTabName, {
        screen: 'TaskList',
        params: { filter: filterValue, title: title },
      });
    },
    [navigation, taskTabName],
  );

  if (!user) return null;

  const parentCards = [
    {
      label: 'Needs Approval',
      value: waitingApprovalTasks.length,
      icon: 'help-circle-outline',
      color: '#2196F3',
      action: () => goToTaskList('approval', 'Needs Approval'),
    },
    {
      label: 'Unassigned',
      value: unAssignedTasks.length,
      icon: 'alert-circle-outline',
      color: '#E53935',
      action: () => goToTaskList('unassigned', 'Unassigned Tasks'),
    },
  ];

  const childCards = [
    {
      label: 'My Tasks',
      value: myTasks.length,
      icon: 'list-circle-outline',
      color: '#4CAF50',
      action: () => goToTaskList('myTasks', 'My Tasks'),
    },
    {
      label: 'Available Tasks',
      value: unAssignedTasks.length,
      icon: 'add-circle-outline',
      color: '#FF9800',
      action: () => goToTaskList('unassigned', 'Available Tasks'),
    },
  ];

  const commonCards = [
    {
      label: 'Due Soon (3 Days)',
      value: tasksDueIn3Days.length,
      icon: 'time-outline',
      color: '#795548',
      action: () => goToTaskList('due3Days', 'Due in 3 Days'),
    },
    {
      label: 'Overdue',
      value: overdueDate.length,
      icon: 'warning-outline',
      color: '#D32F2F',
      action: () => goToTaskList('overdue', 'Overdue Tasks'),
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.welcomeText, { color: theme.textSecondary }]}>
        Welcome, <Text style={{ color: theme.accent }}>{user?.name}</Text>
      </Text>

      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Here's your dashboard summary
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 50 }}
          color={theme.accent}
        />
      ) : (
        <>
          {/* STAT CARDS */}
          <View style={styles.grid}>
            {(user?.role === 'parent' ? parentCards : childCards).map(
              (card, index) => (
                <StatCard key={index} {...card} />
              ),
            )}
          </View>

          <View style={styles.grid}>
            {commonCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </View>

          {/* QUICK ACTIONS */}
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>
            Quick Actions
          </Text>

          <View style={styles.quickRow}>
            {user?.role === 'parent' && (
              <QuickButton
                theme={theme}
                icon="create-outline"
                label="Create"
                onPress={() =>
                  navigation.navigate(taskTabName, { screen: 'TaskForm' })
                }
              />
            )}

            <QuickButton
              icon="list-outline"
              theme={theme}
              label={taskTabName}
              onPress={() =>
                navigation.navigate(taskTabName, { screen: 'TaskList' })
              }
            />

            {user?.role === 'parent' && (
              <QuickButton
                icon="people-outline"
                label="Children"
                theme={theme}
                onPress={() =>
                  navigation.navigate('Children', {
                    screen: 'ChildrenLocationScreen',
                  })
                }
              />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },

  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 15,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 15,
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 12,
  },
});

export default HomeScreen;
