import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TaskScreen = () => {
  return (
    <View style={styles.container}>
      {/* Task screen content goes here */}
      <Text>Task Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskScreen;
