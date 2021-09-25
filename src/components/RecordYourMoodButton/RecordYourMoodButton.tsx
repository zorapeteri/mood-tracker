import React from 'react';
import Button from '../Button';

type RecordYourMoodButtonProps = {
  className?: string;
  setPickingMood: (arg: boolean) => void;
};

const RecordYourMoodButton: React.FunctionComponent<RecordYourMoodButtonProps> = (
  props: RecordYourMoodButtonProps
) => {
  const { className, setPickingMood } = props;

  return (
    <Button
      color="secondary"
      fontSize="1em"
      padding="1em 2em"
      className={className}
      onClick={() => setPickingMood(true)}
    >
      Record your mood
    </Button>
  );
};

export default RecordYourMoodButton;
