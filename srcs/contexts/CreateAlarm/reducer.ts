import {State, UpdateAction} from './types';

export const initialState: State = {
  active: true,
  date: new Date(),
  message: 'New Alarm',
  snooze: 1,
  soundName: 'Marimba',
};

const alarmReducer = (state = initialState, action: UpdateAction) => {
  const {type, value} = action;
  switch (type) {
    case '@alarm/update':
      return {...state, [action.propertyName]: value};
    default:
      throw new Error(`No case for type ${type}`);
  }
  return state;
};

export default alarmReducer;
