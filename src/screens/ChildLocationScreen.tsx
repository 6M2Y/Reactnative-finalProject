import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { useFamilyMembers } from '../hooks/useFamilyMembers';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChildLocationScreen = ({ navigation }: any) => {
  const { user }: any = useContext(AuthContext);
  const {
    members: children,
    loading,
    err,
  } = useFamilyMembers(user?.familyCode);

  const formatDate = (value: any) => {
    if (!value) return 'No location yet';
    const d = new Date(value);
    if (isNaN(d.getTime())) return 'No location yet';
    return d.toLocaleString();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (err) {
    return (
      <View style={styles.centered}>
        <Text>Error: {err}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Children Overview</Text>

        {/* Only parents see Add Child */}
        {user?.role === 'parent' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddChild')}
          >
            <Ionicons name="person-add-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* CHILDREN LIST */}
      <FlatList
        data={children}
        keyExtractor={(child: any) => child._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('childLocationMap', { childLocData: item })
            }
          >
            {/* Avatar */}
            <Image
              source={{
                uri:
                  item.avatarUrl ||
                  'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
              }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.subtitle}>
                Last seen: {formatDate(item.location?.updatedAt)}
              </Text>

              {/* Stats row */}
              <View style={styles.statsRow}>
                <Text style={styles.statText}>⭐ {item.points} pts</Text>
                <Text style={styles.statText}>
                  ✅ {item.completedTasks || 0} tasks
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#666"
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },

  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: { fontSize: 26, fontWeight: '700' },

  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 14,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    backgroundColor: '#ddd',
  },

  name: { fontSize: 18, fontWeight: '700' },
  subtitle: { fontSize: 13, color: '#777', marginTop: 4 },

  statsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statText: {
    marginRight: 15,
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
});

export default ChildLocationScreen;
