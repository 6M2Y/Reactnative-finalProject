import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

//api
import { AuthContext } from '../../context/AuthContextProvider';

//hooks
import { useTaskActions } from '../../hooks/useTaskActions'; //custom hook for task actions

//components
import { TaskHeader } from '../../components/Task/TaskHeader'; //task details header
import { ChildAction } from '../../components/Task/ChildAction'; //child actions component
import { ParentAction } from '../../components/Task/ParentAction'; //parent actions component
import { ProofImage } from '../../components/Task/ProofImage'; //proof image component
import { CommentList } from '../../components/Task/CommentList'; //comments list component
import { FireworksAnim } from '../../components/Task/FireworksAnim'; //fireworks animation component
import { Buttons } from '../../components/Buttons'; //reusable button component
import { useFocusEffect } from '@react-navigation/native';
import { useTaskContext } from '../../context/TaskContext';
import { ThemeContext } from '../../context/ThemeContext';

const TaskDetailScreen = ({ route, navigation }: any) => {
  const { user }: any = useContext(AuthContext); //get user from auth context
  const { tasks }: any = useTaskContext(); //get tasks from global state
  const { theme } = useContext(ThemeContext);

  const taskId = route.params.taskId;

  //find current task from global state
  const currentTask = tasks.find((t: any) => t._id === taskId);
  //local state for comment input
  const [message, setMessage] = useState<string>('');

  //refresh task when screen is focused
  useFocusEffect(useCallback(() => {}, [taskId]));

  //customm hook for task actions
  const {
    completeTask,
    handleClaim,
    handleCommentSend,
    handleDelete,
    reviewCompletedTask,
    pickImage,
    handleEdit,
  } = useTaskActions({
    taskId,
    user,
    navigation,
  });

  //if not logged in
  if (!user) return null;
  //if no task found
  if (!currentTask) return null;

  const isChild = user.role === 'child';
  const isParent = user.role === 'parent';
  const isTaskUnassigned = !currentTask.assignedTo;
  const isTaskVerified = currentTask.verified;
  const isTaskCompleted = currentTask.status === 'completed';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {' '}
      {/* Fireworks overlay */}
      <FireworksAnim show={isChild && isTaskCompleted} />
      {/* ---------------common---------------------- */}
      {/* Task header showing title, description, assigned to, points, status, due date */}
      <TaskHeader task={currentTask} user={user} theme={theme} />
      {/* ---------------children---------------------- */}
      {/* children can claim, complete tasks and upload proof image */}
      {isChild && (
        <ChildAction
          isTaskCompleted={isTaskCompleted}
          isTaskUnassigned={isTaskUnassigned}
          proofImg={currentTask.proofImg}
          onClaim={() => handleClaim(taskId)}
          onComplete={() => completeTask(taskId)}
          onPickImage={() => pickImage(taskId)}
        />
      )}
      {/* ---------------parents---------------------- */}
      {/* parents can edit, verify or delete tasks */}
      {isParent && (
        <ParentAction
          completedTask={isTaskCompleted}
          verifiedTask={isTaskVerified}
          editTask={() => handleEdit(taskId)}
          deleteTask={() => handleDelete(taskId)}
          reviewAndCompletedTask={() => reviewCompletedTask(taskId)}
        />
      )}
      {/* show proof image */}
      {currentTask.proofImg && (
        <ProofImage uri={currentTask.proofImg.uri || currentTask.proofImg} />
      )}
      <CommentList comments={currentTask.comments || []} />
      {/**/}
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="write a comment ..."
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.commentInput,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
        />
        <Buttons
          action={() => {
            handleCommentSend(taskId, message);
            setMessage('');
          }}
          titleText="Send"
          color="#099e42ff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
});
export default TaskDetailScreen;
