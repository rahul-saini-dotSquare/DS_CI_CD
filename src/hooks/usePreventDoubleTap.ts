import { useCallback, useEffect, useRef } from 'react';
import Logger from '@utils/Logger';

type AnyFunction = (...args: never[]) => unknown;

const usePreventDoubleTap = <T extends AnyFunction>(fn: T, cooldown = 800) => {
  const locked = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    async (...args: Parameters<T>) => {
      if (locked.current) {
        return;
      }
      locked.current = true;
      try {
        await fn(...args);
      } catch (error) {
        Logger.error('usePreventDoubleTap error:', error);
      } finally {
        timeoutRef.current = setTimeout(() => {
          locked.current = false;
        }, cooldown);
      }
    },
    [fn, cooldown],
  );
};

export default usePreventDoubleTap;
