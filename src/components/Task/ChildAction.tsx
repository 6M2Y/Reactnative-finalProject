import { View } from 'react-native';
import { Buttons } from '../Buttons';

export const ChildAction = ({
  isTaskCompleted,
  isTaskUnassigned,
  proofImg,
  onClaim,
  onComplete,
  onPickImage,
}: any) => {
  return (
    <View>
      {/* Child Actions */}
      {isTaskUnassigned && (
        <Buttons titleText="Claim Task" color="#ffa726" action={onClaim} />
      )}

      {!isTaskCompleted && !isTaskUnassigned && (
        <>
          <Buttons
            titleText="Complete Task"
            color="#66bb6a"
            action={onComplete}
          />
          <Buttons
            titleText={proofImg ? 'Change Proof Image' : 'Upload Proof Image'}
            color="#29b6f6"
            action={onPickImage}
          />
        </>
      )}
    </View>
  );
};
