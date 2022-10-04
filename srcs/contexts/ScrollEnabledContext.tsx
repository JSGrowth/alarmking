import React, {createContext, ReactNode, useContext, useState} from 'react';
import type {FC} from 'react';
import {screensEnabled} from 'react-native-screens';

export type ScrollEnabledContextType = {
  scrollEnabled: boolean;
  setScrollEnabled: (enable: boolean) => void;
};

const defaultScrollEnabledContext = {
  scrollEnabled: true,
  setScrollEnabled: () => {
    screensEnabled();
  },
};
const ScrollEnabledContext = createContext<ScrollEnabledContextType>(
  defaultScrollEnabledContext,
);

type ScrollEnabledContextProps = {children: ReactNode};
export const ScrollEnabledProvider: FC<ScrollEnabledContextProps> = ({
  children,
}) => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const value = {
    scrollEnabled,
    setScrollEnabled,
  };
  return (
    <ScrollEnabledContext.Provider value={value}>
      {children}
    </ScrollEnabledContext.Provider>
  );
};

export const useScrollEnabled = (): [boolean, (enabled: boolean) => void] => {
  const {scrollEnabled, setScrollEnabled} = useContext(ScrollEnabledContext);
  return [scrollEnabled, setScrollEnabled];
};
