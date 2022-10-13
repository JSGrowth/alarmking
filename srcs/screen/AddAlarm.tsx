import React, {useLayoutEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
//prettier-ignore
import { Pressable, Text, View, Switch, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParamList} from './Main';
import {MD2Colors as Colors} from 'react-native-paper';
import {AlarmType, createAlarm} from '../libs/alarm';
import {styles} from './AddAlarm.style';

type AlarmScreenProp = StackNavigationProp<ModalStackParamList, 'AddAlarm'>;

const AddAlarm = () => {
  const navigation = useNavigation<AlarmScreenProp>();
  const [newAlarm, setNewAlarm] = useState<AlarmType>({
    active: true,
    date: new Date(),
    message: 'New Alarm',
    snooze: 1,
    soundName: 'Marimba',
  });

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
            createAlarm({...newAlarm}).then(() => {
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
  }, [newAlarm, navigation]);

  const optionData = [
    {navigateTo: 'Message', value: newAlarm.message},
    {navigateTo: 'Repeat', value: 'Never'},
    {navigateTo: 'Song', value: newAlarm.soundName},
  ];

  return (
    <View style={[styles.view]}>
      <DateTimePicker
        mode="time"
        display="spinner"
        value={newAlarm.date}
        onChange={(event, picked) => {
          setNewAlarm((prevState: AlarmType) => {
            return {...prevState, date: picked};
          });
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
              value={newAlarm.active}
              onChange={() => {
                setNewAlarm((prevState: AlarmType) => {
                  return {...prevState, active: !prevState.active};
                });
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddAlarm;
