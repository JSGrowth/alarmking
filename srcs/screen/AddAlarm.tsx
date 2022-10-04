import React, {useLayoutEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
//prettier-ignore
import { Pressable, StyleSheet, Text, View, Switch, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParamList} from './StackNavigator';
import {MD2Colors as Colors} from 'react-native-paper';
import {createAlarm} from '../libs/alarm';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../store';
import * as A from '../store/alarm';

type alarmScreenProp = StackNavigationProp<ModalStackParamList, 'AddAlarm'>;

const AddAlarm = () => {
  const navigation = useNavigation<alarmScreenProp>();
  const {active, date, message, snooze, soundName} = useSelector<
    AppState,
    A.State
  >(({alarm}) => alarm);
  const dispatch = useDispatch();
  const [dateState, setDateState] = useState<Date>(new Date(date));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => {
            dispatch(A.resetAction());
            navigation.goBack();
          }}>
          <Text style={[{fontSize: 18, color: Colors.blue500}]}>Cancel</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            createAlarm({active, date, message, snooze, soundName});
            navigation.goBack();
          }}>
          <Text
            style={[{fontSize: 18, color: Colors.blue500, fontWeight: '600'}]}>
            Save
          </Text>
        </Pressable>
      ),
    });
  }, [date, active, navigation]);
  // }, [navigation]);

  const optionData = [
    {navigateTo: 'Message', value: 'message'},
    {navigateTo: 'Repeat', value: 'Never'},
    {navigateTo: 'Song', value: 'Marimba'},
  ];

  return (
    <View style={[styles.view]}>
      <DatePicker
        date={dateState}
        mode="time"
        onDateChange={picked => {
          setDateState(picked);
          dispatch(A.updateAction('date', picked.toISOString()));
        }}
      />
      <View style={[styles.tapListView]}>
        <FlatList
          data={optionData}
          ItemSeparatorComponent={() => <View style={[styles.separator]} />}
          renderItem={({item}) => (
            <TouchableOpacity
              // @ts-ignore
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
              value={active}
              onChange={() => {
                dispatch(A.updateAction('active', !active));
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tapListView: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: Colors.grey200,
  },
  tapItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginLeft: 12,
    marginRight: 12,
    margin: 10,
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: 'lightgray',
  },
});

export default AddAlarm;
