import {ResetAction, UpdateAction} from './types';

export const updateAction = (
  propertyName: string,
  value: any,
): UpdateAction => ({
  type: '@alarm/update',
  propertyName,
  value,
});

export const resetAction = (): ResetAction => ({
  type: '@alarm/reset',
});
