import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { claimTask, getTasks } from '../../api/taskApi';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function UnassignedTasksScreen({ route, navigation }: any): any {
  const { user }: any = useContext(AuthContext);
  const passedAvailableTasks = route.params?.tasks;
  const [tasks, setTasks] = useState<any[]>(passedAvailableTasks || []);
  const [loading, setLoading] = useState(!passedAvailableTasks);

  useEffect(() => {
    if (!passedAvailableTasks)
      //for some case if we dont get the passedunassignedtasks as params, we fetch from db
      fetchFromApi();
  }, []);

  const fetchFromApi = async () => {
    setLoading(true);
    const getAllTasks = await getTasks(user.familyCode);
    const unassignedTasks = getAllTasks.filter((t: any) => !t.assignedTo);
    setTasks(unassignedTasks);
    setLoading(false);
  };

  //handle claim
  const handleClaim = async (taskId: string) => {
    try {
      await claimTask(taskId, user._id);
      Alert.alert('Task claimed successfully');

      setTasks(prev => prev.filter(t => t._id !== taskId));
    } catch (error: any) {
      Alert.alert('Couldnt claim taks', error.message);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('TaskDetails', { task: item })}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.sub}>{item.description || 'No description'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.claimBtn}
        onPress={() => handleClaim(item._id)}
      >
        <Ionicons name="flash" size={18} color="#fff" />
        <Text style={styles.claimText}>Claim</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Tasks</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : tasks.length === 0 ? (
        <Text>No open tasks. Enjoy your free time 🎉</Text>
      ) : (
        <FlatList data={tasks} renderItem={renderItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#F8F8F8',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  sub: { color: '#666', marginTop: 5 },

  claimBtn: {
    marginTop: 12,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
  },
});
