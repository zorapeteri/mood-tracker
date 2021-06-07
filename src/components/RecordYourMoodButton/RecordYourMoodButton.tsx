import React from 'react';
import Button from '../Button';

type RecordYourMoodButtonProps = {
  className: string;
  onClick: () => void;
};

const RecordYourMoodButton: React.FunctionComponent<RecordYourMoodButtonProps> = (props: RecordYourMoodButtonProps) => {
  const { className, onClick } = props;

  return (
    <Button color="secondary" fontSize="1em" padding="1em 2em" className={className} onClick={() => onClick()}>
      Record your mood
    </Button>
  );
};

export default RecordYourMoodButton;
