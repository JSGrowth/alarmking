import {AlarmType} from '@common/type';
import type {Action} from 'redux';

export type CreateAlarmType = AlarmType;

export type UpdateAction = Action<'@alarm/update'> & {
  propertyName: string;
  value: any;
};

export type ResetAction = Action<'@alarm/reset'>;

export type Actions = ResetAction | UpdateAction;
