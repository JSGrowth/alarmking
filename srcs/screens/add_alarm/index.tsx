import React, {useEffect, useLayoutEffect} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, View, Switch, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {
  resetAction,
  updateAction,
  useCreateAlarm,
} from '@srcs/contexts/CreateAlarm';
import theme from '@common/theme';
import {createAlarm} from '@srcs/libs/alarm';

type addAlarmScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'AddAlarm'
>;

export default function AddAlarm({route, navigation}: addAlarmScreenProp) {
  const {setUpdated} = route.params;
  const {state, dispatch} = useCreateAlarm();
  const handleDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date) dispatch(updateAction('date', date));
  };
  useEffect(() => dispatch(resetAction()), [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="ios-chevron-back"
          size={30}
          style={{borderRadius: 4, color: theme.color.primary}}
          onPress={navigation.goBack}
        />
      ),
      headerRight: () => (
        <Icon
          name="checkmark"
          size={30}
          style={{
            borderRadius: 4,
            overflow: 'hidden',
            color: theme.color.primary,
          }}
          onPress={() =>
            createAlarm({...state}).then(() => {
              setUpdated(true);
              navigation.goBack();
            })
          }
        />
      ),
    });
  }, [navigation]);

  const optionData = [
    {title: '요일 반복', navigateTo: 'Repeat', value: '안 함'},
    {title: '이름', navigateTo: 'Message', value: state.message},
    {title: '벨소리', navigateTo: 'Song', value: state.soundName},
  ];

  return (
    <View style={[styles.view]}>
      <DateTimePicker
        mode="time"
        display="spinner"
        locale={'en_GB'}
        value={state.date}
        onChange={handleDate}
        themeVariant={'dark'}
      />
      <View style={[styles.tapListView]}>
        <FlatList
          data={optionData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Repeat')}>
              <View style={[styles.tapItemView]}>
                <Text
                  style={[
                    {
                      fontFamily: 'NotoSansKR-Medium',
                      fontSize: theme.fontSize.sm,
                      color: theme.color.white,
                    },
                  ]}>
                  {item.navigateTo}
                </Text>
                <Text
                  style={[
                    {fontSize: theme.fontSize.sm, color: theme.color.grey99},
                  ]}>
                  {item.value}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity disabled={true}>
          <View style={[styles.tapItemView]}>
            <Text
              style={[
                {
                  fontFamily: 'NotoSansKR-Medium',
                  fontSize: theme.fontSize.sm,
                  color: theme.color.white,
                },
              ]}>
              {/* todo: 지금 이 값 Active */}
              다시 알림
            </Text>
            <Switch
              trackColor={{true: theme.color.primary, false: theme.color.black}}
              value={state.active}
              onValueChange={val => dispatch(updateAction('active', val))}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.color.black,
  },
  tapListView: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
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
