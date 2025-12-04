import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { useTaskForm } from '../../hooks/useTaskForm';
import { useFamilyMembers } from '../../hooks/useFamilyMembers';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { LabeledInput } from '../../components/TaskForm/LabeledInput';
import { RecurrencePicker } from '../../components/TaskForm/RecurrencePicker';
import { DaySelector } from '../../components/TaskForm/DaySelector';
import { Picker } from '@react-native-picker/picker';
import { Buttons } from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerInput from '../../components/Task/DatePickerInput';
import { ThemeContext } from '../../context/ThemeContext';

const TaskFormScreen = ({ navigation }: any) => {
  const { user }: any = useContext(AuthContext);
  const { formData, setField, toggleDay, validateAndSubmitForm } = useTaskForm({
    user,
    navigation,
  });

  const { theme }: any = useContext(ThemeContext);

  const { members, loading } = useFamilyMembers(user?.familyCode);

  return (
    <ScrollView>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.formHeader, { color: theme.text }]}>
          Task Form Screen
        </Text>
        <LabeledInput
          label="Title"
          value={formData.title}
          onChangeText={(text: string) => setField('title', text)}
        />
        <LabeledInput
          label="Description"
          value={formData.description}
          onChangeText={(text: string) => setField('description', text)}
        />

        <DatePickerInput
          label="Due Date"
          value={formData.dueDate}
          onConfirm={(date: Date) => setField('dueDate', date)}
        />

        <RecurrencePicker
          value={formData.recurrence}
          onChange={(value: string) => setField('recurrence', value)}
        />
        {formData.recurrence === 'custom' && (
          <DaySelector
            selectedDays={formData.recurrenceDays}
            toggleDay={toggleDay}
          />
        )}
        <LabeledInput
          label="Points"
          value={formData.points}
          onChangeText={(pointsString: string) =>
            setField('points', pointsString)
          }
          keyboardType="numeric"
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          Assign To:
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Picker
            selectedValue={formData.assignedTo}
            onValueChange={(value: string) => setField('assignedTo', value)}
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10 }}
          >
            <Picker.Item label="Select a child" value="" />
            {members.map(child => (
              <Picker.Item
                key={child._id}
                label={child.name}
                value={child._id}
              />
            ))}
          </Picker>
        )}
        <LabeledInput
          label={`FamilyCode: ${user?.familyCode}`}
          value={user?.familyCode}
          editable={false}
        />
        <Buttons
          color="rgba(40, 182, 207, 1)"
          titleText="Create Task"
          action={validateAndSubmitForm}
        />
        <Buttons
          color="rgba(236, 82, 21, 1)"
          titleText="Cancel"
          action={() => navigation.goBack()}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default TaskFormScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  formHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
});
