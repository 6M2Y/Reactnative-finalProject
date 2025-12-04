import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// You might need to install 'react-native-vector-icons' for the icons below
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Helper function to get status colors
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return { backgroundColor: '#4CAF50', color: '#FFFFFF' }; // Green
    case 'assigned':
      return { backgroundColor: '#FFC107', color: '#000000' }; // Yellow/Amber
    case 'pending':
    case 'unassigned':
      return { backgroundColor: '#2196F3', color: '#FFFFFF' }; // Blue
    case 'verified':
      return { backgroundColor: '#8BC34A', color: '#FFFFFF' }; // Light Green
    default:
      return { backgroundColor: '#BDBDBD', color: '#000000' }; // Grey
  }
};

export const TaskHeader = ({ task, theme }: any) => {
  const statusStyles = getStatusStyle(task.status);

  return (
    <View
      style={[styles.headerContainer, { backgroundColor: theme.background }]}
    >
      {/* 1. Main Title */}
      <Text style={styles.mainTitle}>{task.title}</Text>

      {/* 2. Status Badge */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: statusStyles.backgroundColor },
        ]}
      >
        <Text style={[styles.statusText, { color: statusStyles.color }]}>
          {task.status.toUpperCase()}
        </Text>
      </View>

      {/* 3. Primary Details (Assigned To & Points) */}
      <View style={styles.primaryDetailsRow}>
        <View style={styles.detailItem}>
          <Icon name="person-outline" size={16} color="#444" />
          <Text style={styles.detailLabel}>Assigned To:</Text>
          <Text style={styles.detailValue}>
            {task.assignedTo ? task.assignedTo.name : 'Unassigned'}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <MaterialCommunityIcons
            name="star-circle-outline"
            size={16}
            color="#FF9800"
          />
          <Text style={styles.detailLabel}>Points:</Text>
          <Text style={styles.detailValue}>{task.points || 0}</Text>
        </View>
      </View>

      {/* 4. Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {task.description || 'No description provided for this task.'}
        </Text>
      </View>

      {/* 5. Due Date (Secondary Detail) */}
      <View style={styles.dueDateRow}>
        <Icon name="calendar-outline" size={14} color="#777" />
        <Text style={styles.dueDateText}>
          Due: {task.dueDate?.slice(0, 10) || 'N/A'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  primaryDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  descriptionContainer: {
    backgroundColor: '#F7F7F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 5,
  },
  dueDateText: {
    fontSize: 13,
    color: '#777',
    fontWeight: '500',
  },
});
