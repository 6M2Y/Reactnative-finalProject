//--------------------------------------------------------------
// useTaskForm.tsx is a custom hook to manage taskform state and submission
// It handles form data, validation, and API interaction for creating new tasks
//--------------------------------------------------------------

import { useState } from 'react';
import { createNewTask } from '../api/taskApi';
import Toast from 'react-native-toast-message';

export const useTaskForm = ({ user, navigation, t }: any) => {
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

  //the giant of this hook validateAndSubmitForm, mainly submitting
  const validateAndSubmitForm = async () => {
    // Basic validation for required fields
    if (!formData.title.trim()) {
      Toast.show({
        type: 'error',
        text1: `${t('toast.formTitle')}`,
      });
      return;
    }

    // points to integer
    const pointsValue = parseInt(formData.points, 10) || 0;

    // setting 'assignedTo' to null if it's an empty string. This is when parents create unassigned task to be claimed by children
    const finalAssignedTo = formData.assignedTo || null;

    try {
      // Prepare task data
      const newTask = {
        title: formData.title,
        description: formData.description,
        recurrence: formData.recurrence,
        dueDate: formData.dueDate,
        recurrenceDays: formData.recurrenceDays,
        points: pointsValue,
        assignedTo: finalAssignedTo,
        familyCode: user.familyCode,
        status: 'pending',
        completed: false,
      };

      // Call API to create new task
      await createNewTask(newTask);
      Toast.show({
        type: 'success',
        text1: `${t('toast.task')}`,
        visibilityTime: 4000,
      });
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
