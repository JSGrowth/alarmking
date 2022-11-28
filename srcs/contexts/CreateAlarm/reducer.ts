import {SOUND} from '@common/constant';
import {Actions, CreateAlarmType} from './types';

export const initialState: CreateAlarmType = {
  active: true,
  date: new Date(),
  message: '일어나자',
  // snooze: 1,
  soundName: SOUND.SOUND1,
};

const alarmReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case '@alarm/update':
      console.log('update action ', action.propertyName, action.value);
      return {...state, [action.propertyName]: action.value};
    case '@alarm/reset':
      console.log('reset');
      return {...initialState};
    default:
      throw new Error(`No case for type ${action}`);
  }
};

export default alarmReducer;
