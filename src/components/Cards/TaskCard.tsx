import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';

const getStatusColors = (task: any) => {
  if (task.verified) {
    return {
      borderColor: '#4CAF50',
      statusColor: '#2E7D32',
      verificationText: 'VERIFIED',
      verificationIcon: 'checkmark-circle-outline',
    };
  }
  if (task.status === 'completed') {
    return {
      borderColor: '#1976D2',
      statusColor: '#1565C0',
      verificationText: 'Awaiting Verification',
      verificationIcon: 'time-outline',
    };
  }
  return {
    borderColor: '#FFA726',
    statusColor: '#FF6F00',
    verificationText: 'Not Completed',
    verificationIcon: 'alert-circle-outline',
  };
};

export const TaskCard = ({
  item,
  onPress,
}: {
  item: any;
  onPress: () => void;
}) => {
  const { theme } = useContext(ThemeContext);

  const { borderColor, statusColor, verificationText, verificationIcon } =
    getStatusColors(item);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.taskCard,
        {
          backgroundColor: theme.card,
          borderLeftColor: borderColor,
          shadowColor: theme.border,
        },
      ]}
    >
      <View style={styles.contentRow}>
        <Text style={[styles.taskTitle, { color: theme.textSecondary }]}>
          {item.title}
        </Text>

        <View style={styles.pointsBadge}>
          <MaterialCommunityIcons
            name="star-circle-outline"
            size={16}
            color="#fff"
          />
          <Text style={styles.pointsText}>{item.points || 0}</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <Text style={[styles.statusText, { color: statusColor }]}>
          {item.status?.toUpperCase()}
        </Text>

        <View style={styles.verificationBadge}>
          <Icon name={verificationIcon} size={14} color={theme.textSecondary} />
          <Text
            style={[styles.verificationText, { color: theme.textSecondary }]}
          >
            {verificationText}
          </Text>
        </View>
      </View>

      <Text style={[styles.dueDateText, { color: theme.textSecondary }]}>
        Due: {item.dueDate?.slice(0, 10) || 'N/A'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    flexShrink: 1,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    gap: 4,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verificationText: {
    fontSize: 13,
  },
  dueDateText: {
    fontSize: 12,
    marginTop: 6,
    borderTopWidth: 1,
    paddingTop: 6,
    borderTopColor: '#F0F0F0',
  },
});
