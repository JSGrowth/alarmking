import {
  deleteAlarmById as RNDeleteAlarmById,
  deleteAllAlarms as RNDeleteAllAlarms,
} from 'react-native-simple-alarm';
import {AlarmType} from '.';

export const deleteAlarmById = async (oid: AlarmType['oid']) => {
  if (oid) {
    try {
      await RNDeleteAlarmById(oid).then(response => {
        console.log('success delete by id', response);
        // dispatch(AL.deleteAction([...response]));
      });
    } catch (error) {
      console.log('deleting alarm by id error: ', error);
    }
  } else console.log('OID of the alarm is undefined');
};

export const deleteAllAlarms = async () => {
  try {
    await RNDeleteAllAlarms().then(() => {
      // dispatch(AL.deleteAllAction());
      console.log('success delete all');
    });
  } catch (error) {
    console.log('delete error' + error);
  }
};
