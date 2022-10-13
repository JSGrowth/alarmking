import React, {Dispatch} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import Home from './Home';
import AddAlarm from './AddAlarm';
import Message from './AddAlarmDetail/Message';
import Song from './AddAlarmDetail/Song';
import Repeat from './AddAlarmDetail/Repeat';

const modalScreenOption: NativeStackNavigationOptions = {
  headerBackTitle: 'Back',
  presentation: 'card',
};

export type ModalStackParamList = {
  AddAlarm: undefined;
  Message: {state: any; setState: Dispatch<any>};
  Song: {state: any; setState: Dispatch<any>};
  Repeat: {state: any; setState: Dispatch<any>};
};

export type RootStackParamList = {
  Home: undefined;
  AddAlarmModal: NavigatorScreenParams<ModalStackParamList>;
};

const ModalStack = createNativeStackNavigator<ModalStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen
        name="AddAlarmModal"
        component={AddAlarmModal}
        options={{
          headerShown: false,
          presentation: 'modal',
          // ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </RootStack.Navigator>
  );
};

const AddAlarmModal = () => {
  return (
    <ModalStack.Navigator
      initialRouteName="AddAlarm"
      screenOptions={{headerShown: true}}>
      <ModalStack.Screen
        name="AddAlarm"
        component={AddAlarm}
        options={{
          title: 'Add Alarm',
          presentation: 'modal',
          // ...TransitionPresets.ModalPresentationIOS,
        }}
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
  );
};

export default Main;
