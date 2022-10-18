import React, {useLayoutEffect, useReducer, useRef, useState} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
//prettier-ignore
import { Pressable, Text, View, Switch, FlatList} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParamList} from './Main';
import {MD2Colors as Colors} from 'react-native-paper';
import {AlarmType, createAlarm} from '../libs/alarm';
import {styles} from './AddAlarm.style';
import {useAlarmUpdate} from '../contexts/useAlarmUpdate';
import useCreateAlarm from '../contexts/CreateAlarm/context';
import {updateAction} from '../contexts/CreateAlarm/actions';

type AlarmScreenProp = StackNavigationProp<ModalStackParamList, 'AddAlarm'>;

const AddAlarm = () => {
  const navigation = useNavigation<AlarmScreenProp>();
  const {setUpdated} = useAlarmUpdate();
  const {state, dispatch} = useCreateAlarm();
  // const [state, dispatch] = useReducer(
  //   (state: AlarmType, updates: any) => ({
  //     ...state,
  //     ...updates,
  //   }),
  //   initialAlarm,
  // );
  const handleDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date) dispatch(updateAction('date', date));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={[{fontSize: 18, color: Colors.blue500}]}>Cancel</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() =>
            createAlarm({...state}).then(() => {
              setUpdated(true);
              navigation.goBack();
            })
          }>
          <Text
            style={[{fontSize: 18, color: Colors.blue500, fontWeight: '600'}]}>
            Save
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const optionData = [
    {navigateTo: 'Message', value: state.message},
    {navigateTo: 'Repeat', value: 'Never'},
    {navigateTo: 'Song', value: state.soundName},
  ];

  return (
    <View style={[styles.view]}>
      <DateTimePicker
        mode="time"
        display="spinner"
        locale={'en_GB'}
        value={state.date}
        onChange={handleDate}
      />
      <View style={[styles.tapListView]}>
        <FlatList
          data={optionData}
          ItemSeparatorComponent={() => <View style={[styles.separator]} />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.navigateTo)}>
              <View style={[styles.tapItemView]}>
                <Text style={[{fontSize: 20, color: Colors.grey900}]}>
                  {item.navigateTo}
                </Text>
                <Text style={[{fontSize: 20, color: Colors.grey600}]}>
                  {item.value}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={[styles.separator]} />
        <TouchableOpacity disabled={true}>
          <View style={[styles.tapItemView]}>
            <Text style={[{fontSize: 20, color: Colors.grey900}]}>Active</Text>
            <Switch
              value={state.active}
              onValueChange={val => dispatch(updateAction('active', val))}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddAlarm;
