import {createAlarm as RNCreateAlarm} from 'react-native-simple-alarm';
import {AlarmType} from '@common/type';

export const createAlarm = async (data: AlarmType) => {
  const {active, date, message, snooze, soundName} = data;
  try {
    await RNCreateAlarm({
      active: true,
      date: date.toISOString(),
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
