import {AlarmType} from '@common/type';
import {getAlarms as RNGetAlarms} from 'react-native-simple-alarm';
import {getAlarmById as RNGetAlarmById} from 'react-native-simple-alarm';

export const getAlarms = async () => {
  try {
    const res = await RNGetAlarms();
    return res;
  } catch (error) {
    console.log('setting call error' + error);
    return [];
  }
};

export const getAlarmById = async (oid: AlarmType['oid']) => {
  try {
    return await RNGetAlarmById(oid);
  } catch (e) {
    console.log('error getting alarm id', e);
  }
};
// export const getAlarmById = async (oid: string | number) => {
//   // let id = '07699912-87d9-11ea-bc55-0242ac130003';
//   try {
//     return await RNGetAlarmById(oid);
//   } catch (error) {
//     console.log('in getAlarmById: ', error);
//   }
// };
