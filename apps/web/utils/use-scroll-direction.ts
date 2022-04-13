import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [scrollingDirection, setScrollingDirection] = useState<{up: boolean; down: boolean}>();
  const [keyPress, setKeyPress] =
    useState<{ alt: boolean; ctrl: boolean; shift: boolean }>();

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {

      setKeyPress({
        alt: event.altKey,
        ctrl: event.ctrlKey,
        shift: event.shiftKey
      })

      if (event.deltaY < 0) {
        setScrollingDirection({up: true, down: false})
      } else if (event.deltaY > 0) {
        setScrollingDirection({ up: false, down: true });
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return { scrollingDirection, keyPress };
};
