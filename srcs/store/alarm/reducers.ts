import * as T from './types';

const initialAlarmState: T.State = {
  active: true,
  date: new Date().toISOString(),
  message: 'empty string!',
  snooze: 1,
  soundName: '',
};

export const reducer = (state = initialAlarmState, action: T.Actions) => {
  switch (action.type) {
    case '@alarm/update':
      return {...state, [action.propertyName]: action.value};
    case '@alarm/reset':
      return initialAlarmState;
  }
  return state;
};
