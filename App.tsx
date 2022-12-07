import React, {Dispatch, SetStateAction} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import theme from '@common/theme';
import {AlarmContextProvider} from '@srcs/contexts/CreateAlarm';
import Home from '@screens/home';
import AddAlarm from '@screens/add_alarm';
import Message from '@screens/add_alarm/components/Message';
import Song from '@screens/add_alarm/components/Sound';
import Repeat from '@screens/add_alarm/components/Repeat';
import Icon from '@common/Icon';
import {Pressable} from 'react-native';
import Math from '@screens/mission/Math';
import Dictaion from '@screens/mission/Dictation';
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

export type RootStackParamList = {
  Home: undefined;
  AddAlarm: {setUpdated: Dispatch<SetStateAction<boolean>>};
  Message: undefined;
  Song: undefined;
  Repeat: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  // <NavigationContainer>
  //   <AlarmContextProvider>
  //     <RootStack.Navigator
  //       screenOptions={navigation => ({
  //         headerLeft: () => (
  //           <Pressable onPress={navigation.navigation.goBack}>
  //             <Icon name="Back" size={30} color={theme.color.text_primary} />
  //           </Pressable>
  //         ),
  //         ...modalScreenOption,
  //       })}
  //       initialRouteName="Home">
  //       <RootStack.Screen
  //         name="Home"
  //         component={Home}
  //         options={{
  //           title: '👑alarmking',
  //         }}
  //       />
  //       <RootStack.Screen name="AddAlarm" component={AddAlarm} />
  //       <RootStack.Screen name="Message" component={Message} />
  //       <RootStack.Screen name="Song" component={Song} />
  //       <RootStack.Screen name="Repeat" component={Repeat} />
  //     </RootStack.Navigator>
  //   </AlarmContextProvider>
  // </NavigationContainer>
  // <Math />
  <Dictaion />
);

export default App;
