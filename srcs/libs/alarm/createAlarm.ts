import {createAlarm as RNCreateAlarm} from 'react-native-simple-alarm';
import {AlarmType} from '.';

export const createAlarm = async (props: AlarmType) => {
  const {active, date, message, snooze, soundName} = props;
  try {
    await RNCreateAlarm({
      active: active,
      date: date,
      message: message,
      snooze: snooze,
      soundName: soundName,
    }).then(res => {
      console.log('result', res);
    });
  } catch (error) {
    console.log('got error on create alarm', error);
  }
};
