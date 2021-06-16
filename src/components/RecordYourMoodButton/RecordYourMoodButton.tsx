import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import Button from '../Button';

type RecordYourMoodButtonProps = {
  className: string;
};

const RecordYourMoodButton: React.FunctionComponent<RecordYourMoodButtonProps> = (props: RecordYourMoodButtonProps) => {
  const { className } = props;

  const { setPickingMood } = useContext(Context);

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
