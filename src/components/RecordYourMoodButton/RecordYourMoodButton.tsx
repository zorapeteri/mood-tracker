import React from 'react';
import Button from '../Button';

type RecordYourMoodButtonProps = {
  className: string;
};

const RecordYourMoodButton: React.FunctionComponent<RecordYourMoodButtonProps> = (props: RecordYourMoodButtonProps) => {
  const { className } = props;

  return (
    <Button color="secondary" fontSize="1em" padding="1em 2em" className={className}>
      Record your mood
    </Button>
  );
};

export default RecordYourMoodButton;
