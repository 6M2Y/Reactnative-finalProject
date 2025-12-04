//--------------------------------------------------------------
// useTaskForm.tsx is a custom hook to manage task form state and submission
// It handles form data, validation, and API interaction for creating new tasks
//--------------------------------------------------------------

import { useState } from 'react';
import { Alert } from 'react-native';
import { createNewTask } from '../api/taskApi';

export const useTaskForm = ({ user, navigation }: any) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    recurrence: 'none',
    dueDate: new Date(),
    recurrenceDays: [] as string[],
    assignedTo: '',
    points: '',
  });

  const setField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      recurrenceDays: prev.recurrenceDays.includes(day)
        ? prev.recurrenceDays.filter(d => d !== day)
        : [...prev.recurrenceDays, day],
    }));
  };

  const validateAndSubmitForm = async () => {
    // Basic validation for required fields
    if (!formData.title.trim()) {
      Alert.alert('Title is required');
      return;
    }
    try {
      // Prepare task data
      const newTask = {
        ...formData,
        familyCode: user.familyCode,
        status: 'pending',
        completed: false,
      };
      // Call API to create new task
      await createNewTask(newTask);
      Alert.alert('Task created successfully');

      navigation.goBack(); // Navigate back after successful creation
    } catch (error: any) {
      console.log('Error creating task:', error.message);
    }
  };

  return {
    formData,
    setField,
    toggleDay,
    validateAndSubmitForm,
  };
};
