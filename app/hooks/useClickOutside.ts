import { useEffect, useRef } from 'react';

/**
 * @param clickOutside event handler for triggering side events
 * @param exceptId optional property that can be used to ignore the place ignore the close behavior
 * @returns
 */
const useOutsideClick = (callback: () => void, exceptId?: string) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, exceptId, ref]);

  return ref;
};

export default useOutsideClick;
