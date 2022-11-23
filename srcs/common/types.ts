import {Notification} from '@notifee/react-native';

export type AlarmType = Notification & {
  repeatDays: string[];
};
