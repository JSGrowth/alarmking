import React, {Dispatch, MutableRefObject, RefObject} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import Home from './Home';
import AddAlarm from './AddAlarm';
import Message from './AddAlarmDetail/Message';
import Song from './AddAlarmDetail/Sound';
import Repeat from './AddAlarmDetail/Repeat';
import {AlarmUpdateProvider} from '../contexts/useAlarmUpdate';
import {AlarmContextProvider} from '../contexts/CreateAlarm/context';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const modalScreenOption: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.color.black,
  },
  headerTitleStyle: {
    color: theme.color.white,
    fontFamily: 'NotoSansKR-Regular',
  },
  headerTintColor: theme.color.primary,
  headerBackTitleVisible: false,
  presentation: 'card',
};

export type ModalStackParamList = {
  AddAlarm: undefined;
  Message: undefined;
  Song: undefined;
  Repeat: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  AddAlarmModal: NavigatorScreenParams<ModalStackParamList>;
};

const ModalStack = createNativeStackNavigator<ModalStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  return (
    <AlarmUpdateProvider>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{title: '👑alarmking', headerTintColor: theme.color.white}}
        />
        <RootStack.Screen
          name="AddAlarmModal"
          component={AddAlarmModal}
          options={
            {headerShown: false, headerBackButtonMenuEnabled: false}
            // {...modalScreenOption,title:'알람 추가' }
          }
        />
      </RootStack.Navigator>
    </AlarmUpdateProvider>
  );
};

const AddAlarmModal = () => {
  return (
    <AlarmContextProvider>
      <ModalStack.Navigator
        initialRouteName="AddAlarm"
        screenOptions={{headerShown: true}}>
        <ModalStack.Screen
          name="AddAlarm"
          component={AddAlarm}
          options={{title: '알람 추가'}}
        />
        <ModalStack.Screen
          name="Message"
          component={Message}
          options={modalScreenOption}
        />
        <ModalStack.Screen
          name="Song"
          component={Song}
          options={modalScreenOption}
        />
        <ModalStack.Screen
          name="Repeat"
          component={Repeat}
          options={modalScreenOption}
        />
      </ModalStack.Navigator>
    </AlarmContextProvider>
  );
};

export default Main;
