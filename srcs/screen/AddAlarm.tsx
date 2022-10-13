import React, {useLayoutEffect, useRef, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
//prettier-ignore
import { Pressable, StyleSheet, Text, View, Switch, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParamList} from './StackNavigator';
import {MD2Colors as Colors} from 'react-native-paper';
import {AlarmType, createAlarm} from '../libs/alarm';

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
