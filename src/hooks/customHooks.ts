import { Dispatch, SetStateAction, useCallback } from 'react';

//boolean
export const useBooleanChangeEvent = (update: Dispatch<SetStateAction<boolean>>) => {
  return useCallback(
    (boolean: boolean) => {
      update(boolean);
    },
    [update]
  );
};
