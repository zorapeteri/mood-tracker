import { SyntheticEvent, useCallback, useRef, useState } from 'react';

const useLongPress = (onLongPress: () => void, onClick: () => void = () => {}, { shouldPreventDefault = true, delay = 300 } = {}) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<HTMLElement>();

  const start = useCallback(
    (event) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress();
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick();
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered],
  );

  return {
    onMouseDown: (e: SyntheticEvent) => start(e),
    onTouchStart: (e: SyntheticEvent) => start(e),
    onMouseUp: (e: SyntheticEvent) => clear(e),
    onMouseLeave: (e: SyntheticEvent) => clear(e, false),
    onTouchEnd: (e: SyntheticEvent) => clear(e),
  };
};

const isTouchEvent = (event: Event) => {
  return 'touches' in event;
};

const preventDefault = (event: TouchEvent) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
