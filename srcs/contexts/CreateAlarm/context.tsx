import React, {createContext, FC, useContext, useReducer} from 'react';
import alarmReducer, {initialState} from './reducer';
import {CreateAlarmType} from './types';

const CreateAlarmContext = createContext<CreateAlarmType>(initialState);

type CreateAlarmContextProps = {
  children: React.ReactNode;
};

export const AlarmContextProvider: FC<CreateAlarmContextProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(alarmReducer, initialState);
  return (
    <CreateAlarmContext.Provider value={{state, dispatch}}>
      {children}
    </CreateAlarmContext.Provider>
  );
};

export const useCreateAlarm = () => {
  const context = useContext(CreateAlarmContext);
  if (context === undefined)
    throw new Error('useCreateAlarm must be used within CreateAlarmContext');
  return context;
};
