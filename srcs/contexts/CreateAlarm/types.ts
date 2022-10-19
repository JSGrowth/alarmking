import type {Action} from 'redux';
import {AlarmType} from '../../libs/alarm/alarmType';

export type CreateAlatmType = AlarmType;

export type UpdateAction = Action<'@alarm/update'> & {
  propertyName: string;
  value: any;
};
