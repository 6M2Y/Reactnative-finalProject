//---------------------------------------------
// StatCard Component - displays a statistic card with an icon, label, value, and action
//mainly used in Dashboard screen
// ---------------------------------------------

import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  icon: string;
  label: string;
  color: string;
  value: string | number;
  action: () => void;
};

const StatCard = ({ icon, label, color, value, action }: Props) => {
  const { theme }: any = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.card, shadowColor: theme.border },
      ]}
      onPress={action}
    >
      <View style={[styles.iconCircle, { backgroundColor: color + '22' }]}>
        <Ionicons name={icon} size={26} color={color} />
      </View>

      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 20,
    borderRadius: 18,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  value: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default StatCard;
