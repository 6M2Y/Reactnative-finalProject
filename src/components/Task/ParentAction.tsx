import { View } from 'react-native';
import { Buttons } from '../Buttons';

export const ParentAction = ({
  completedTask,
  verifiedTask,
  editTask,
  deleteTask,
  reviewAndCompletedTask,
}: any) => {
  return (
    <View>
      {/* Parent Actions */}

      {!completedTask && (
        <Buttons
          titleText="Edit Task"
          color="rgba(73, 73, 187, 1)"
          action={() => {
            editTask();
          }}
        />
      )}
      {/* only verify completed but not verified tasks */}
      {completedTask && !verifiedTask && (
        <Buttons
          color="rgba(59, 231, 217, 1)"
          titleText="Verify Task"
          action={() => reviewAndCompletedTask()}
        />
      )}

      <Buttons
        titleText="Delete Task"
        color="rgba(127, 10, 138, 1)"
        action={deleteTask}
      />
    </View>
  );
};
