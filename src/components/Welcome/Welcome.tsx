import React from 'react';
import Button from '../Button';
import style from './Welcome.module.scss';

type WelcomeProps = {
  goToNext: () => void;
};

const Welcome: React.FunctionComponent<WelcomeProps> = (props: WelcomeProps) => {

  return (
    <div className={style.welcome}>
      <h1>Welcome!</h1>
      <h2>Record your mood or your thoughts any time during the day.</h2>
      <Button
        color="primary"
        fontSize="1rem"
        padding="15px 40px"
        onClick={() => props.goToNext()}
      >
        Get started
      </Button>
      <img src={`${process.env.PUBLIC_URL}/assets/welcome.svg`} alt="person on hot air balloon" />
    </div>
  );
};

export default Welcome;
