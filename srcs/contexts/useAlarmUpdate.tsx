import React, {createContext, FC, useContext, useState} from 'react';
export type AlarmUpdateContextType = {
  updated: boolean;
  setUpdated: (val: boolean) => void;
};

const defaultAlarmUpdateContext = {
  updated: true,
  setUpdated: (val: boolean) => {},
};

const AlarmUpdateContext = createContext<AlarmUpdateContextType>(
  defaultAlarmUpdateContext,
);

type AlarmUpdateContextProps = {
  children: React.ReactNode;
};
export const AlarmUpdateProvider: FC<AlarmUpdateContextProps> = ({
  children,
}) => {
  const [updated, setUpdated] = useState<boolean>(true);
  const value = {updated, setUpdated};
  return (
    <AlarmUpdateContext.Provider value={value}>
      {children}
    </AlarmUpdateContext.Provider>
  );
};
export const useAlarmUpdate = () => {
  const {updated, setUpdated} = useContext(AlarmUpdateContext);
  return {updated, setUpdated};
};
