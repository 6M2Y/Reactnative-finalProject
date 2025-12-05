//---------------------------------
//useTaskActions hook helps the taskdetailscreen functions. user the global user variable and navigation which are feed from the taskdetailscreen and
//outputs   completeTask, handleClaim, handleCommentSend, handleDelete, reviewCompletedTask, pickImage,
//-----------------------------------------------------------

import { Alert } from 'react-native';
import {
  addComment,
  claimTask,
  deleteTask,
  updateTask,
  verifyTask,
} from '../api/taskApi';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadProof } from '../api/userApi';
import { useTaskContext } from '../context/TaskContext'; // Import the useTaskContext hook
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

export const useTaskActions = ({ user, navigation }: any) => {
  const { updateTaskInState }: any = useTaskContext();
  const { t } = useTranslation();

  //children mark task as complete
  const completeTask = async (currentTask_id: string) => {
    try {
      const updated = await updateTask(currentTask_id, {
        status: 'completed',
        completed: true,
      });

      // Update global state
      updateTaskInState(currentTask_id, {
        status: updated.status,
        completed: updated.completed,
      });

      Alert.alert('Task marked as completed!', '', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error trying to update the task:', error.message);
    }
  };

  //handle claim
  const handleClaim = async (taskId: string) => {
    try {
      const updated = await claimTask(taskId, user._id);

      updateTaskInState(taskId, {
        assignedTo: updated.assignedTo,
        status: updated.status,
      }); // Update global state

      Toast.show({
        type: 'success',
        text1: `${t('toast.claim')}`,
      });
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Couldnt claim taks', error.message);
    }
  };

  //comments
  const handleCommentSend = async (taskId: string, message: any) => {
    if (!message.trim()) return;
    const newComment = {
      authorId: user._id,
      authorName: user.name,
      authorRole: user.role,
      message,
    };
    try {
      const updateComments = await addComment(taskId, newComment);

      updateTaskInState(taskId, { comments: updateComments }); // Update comments in global state
    } catch (error: any) {
      Alert.alert('Error adding comment:', error.message);
    }
  };
  //parent delete task
  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);

      Alert.alert('Task deleted');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error trying to delete a task: ' + error.message);
    }
  };

  //parents verify
  const reviewCompletedTask = async (taskId: string) => {
    try {
      const updated = await verifyTask(taskId);
      updateTaskInState(taskId, {
        verified: updated.verified,
        status: updated.status,
      }); // Update global state
      Toast.show({
        type: 'success',
        text1: `${t('toast.verify')}`,
      });
    } catch (error: any) {
      Alert.alert('Error trying to verify a task: ' + error.message);
    }
  };

  // proof image
  const pickImage = async (taskId: string) => {
    try {
      const response = await launchImageLibrary({ mediaType: 'photo' });

      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Image picker error', response.errorMessage);
        return;
      }
      const img = response.assets?.[0];
      if (!img) return;

      // 2. Build formData
      const formData = new FormData();
      formData.append('proof', {
        uri: img.uri,
        type: img.type,
        name: img.fileName ?? 'image.jpg',
      } as any);

      // 3. Upload to backend
      const uploaded = await uploadProof(formData, taskId);

      // 4. Update global state (KEY POINT!)
      updateTaskInState(taskId, { proofImg: uploaded.proofImg });

      Toast.show({
        type: 'success',
        text1: 'Proof image uploaded',
      });
    } catch (err: any) {
      Alert.alert('Upload failed', err.message);
    }
  };
  //edit task coming soon
  const handleEdit = async (taskId: string) => {
    // Placeholder for future edit functionality
    Alert.alert('Edit task feature coming soon!' + taskId);
  };

  return {
    completeTask,
    handleClaim,
    handleCommentSend,
    handleDelete,
    reviewCompletedTask,
    pickImage,
    handleEdit,
  };
};

/* export const useTaskActions = ({
  currentTask,
  user,
  setCurrentTask,
  setComments,
  navigation,
}: any) => {
  //children mark task as complete
  const completeTask = async () => {
    try {
      await updateTask(currentTask._id, {
        status: 'completed',
        completed: true,
      });
      Alert.alert('Task marked as completed!', '', [
        {
          text: 'OK',
          onPress: () => {
            // Update local state and go back after the animation has a moment to show
            setCurrentTask(prev => ({ ...prev, status: 'completed' }));
            setTimeout(navigation.goBack(), 1500);
          },
        },
      ]);
    } catch (err: any) {
      Alert.alert('Error trying to update the task:', err.message);
    }
  };
  //handle claim
  const handleClaim = async () => {
    try {
      await claimTask(currentTask._id, user._id);
      Alert.alert('Task claimed successfully');
    } catch (error: any) {
      Alert.alert('Couldnt claim taks', error.message);
    }
  };

  //comments
  const handleCommentSend = async (message: any) => {
    if (!message.trim()) return;
    const newComment = {
      authorId: user._id,
      authorName: user.name,
      authorRole: user.role,
      message,
    };
    const updateComments = await addComment(currentTask._id, newComment);
    setComments(updateComments);
    /*   setMessage(''); *
}
  //parent delete task
  const handleDelete = async () => {
    try {
      await deleteTask(currentTask._id);
      Alert.alert('Task deleted');
      /* navigation.goBack(); *
    } catch (err: any) {
      Alert.alert('Error trying to delete a task: ' + err.message);
    }
  };

  //parents verify
  const reviewCompletedTask = async () => {
    try {
      await verifyTask(currentTask._id);
      Alert.alert('Task verified');
      /* navigation.goBack(); *
    } catch (err: any) {
      Alert.alert('Error trying to verify a task: ' + err.message);
    }
  };

  //pickimage
  const pickImage = async () => {
    let response;
    //launch image library

    try {
      response = await launchImageLibrary({ mediaType: 'photo' });
    } catch (error: any) {
      Alert.alert('Error picking image:', error.message);
      return;
    }

    if (response.didCancel) return; // user cancelled
    if (response.errorCode) {
      // error occurred
      Alert.alert('ImagePicker Error: ' + response.errorMessage);
      return;
    }
    if (!response.assets || !response.assets.length) return; // no assets found
    // proceed with the first image
    const img = response.assets[0]; // get the first selected image
    // create form data
    const formData = new FormData();
    formData.append('proof', {
      uri: img.uri,
      name: img.fileName || 'photo.jpg',
      type: img.type,
    } as any);

    try {
      //upload to server
      const upload = await uploadProof(formData, currentTask._id);
      Alert.alert('Image uploaded');

      //update current task with new proof image
      setCurrentTask((prev: any) => ({
        ...prev,
        proofImg: upload.proofImg,
      }));
    } catch (error: any) {
      Alert.alert('Upload Failed', error.message);
    }
  };

  //edit task coming soon
  const handleEdit = async () => {};

  return {
    completeTask,
    handleClaim,
    handleCommentSend,
    handleDelete,
    reviewCompletedTask,
    pickImage,
    handleEdit,
  };
};
 */
