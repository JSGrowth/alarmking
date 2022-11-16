import {SOUND} from '@common/constant';
import {CreateAlatmType, UpdateAction} from './types';

export const initialState: CreateAlatmType = {
  active: true,
  date: new Date(),
  message: 'wake up ealry',
  snooze: 1,
  soundName: SOUND.SOUND1,
};

const alarmReducer = (state = initialState, action: UpdateAction) => {
  switch (action.type) {
    case '@alarm/update':
      console.log('update action ', action.propertyName, action.value);
      return {...state, [action.propertyName]: action.value};
    default:
      throw new Error(`No case for type ${action.type}`);
  }
  return state;
};

export default alarmReducer;
