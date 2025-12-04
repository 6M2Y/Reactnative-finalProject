import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import React from 'react';

type BtnProp = {
  titleText: string;
  color: string;
  action: () => void;
};

export const Buttons = ({ titleText, color, action }: BtnProp) => {
  return (
    <View style={styles.btnStyle}>
      <Button color={color} title={titleText} onPress={action} />;
    </View>
  );
};

export const QuickButton = ({ icon, label, theme, onPress }: any) => (
  <TouchableOpacity
    style={[styles.quickBtn, { backgroundColor: theme.card }]}
    onPress={onPress}
  >
    <Ionicons name={icon} size={20} color="#2563EB" />
    <Text style={[styles.quickText, { color: theme.textSecondary }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {
    marginVertical: 10,
  },
  quickBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2933',
  },
});
