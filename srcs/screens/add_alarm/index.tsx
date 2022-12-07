import React, {useEffect, useLayoutEffect} from 'react';
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
// import {createAlarm} from '@srcs/libs/alarm';
import DatePicker from 'react-native-date-picker';
import Icon from '@common/Icon';

type addAlarmScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'AddAlarm'
>;

export default function AddAlarm({route, navigation}: addAlarmScreenProp) {
  const {setUpdated} = route.params;
  const {state, dispatch} = useCreateAlarm();
  useEffect(() => dispatch(resetAction()), []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="Check"
          size={30}
          color={theme.color.text_primary}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [state]);
  type optionType = {
    title: string;
    navigateTo: 'Repeat' | 'Message' | 'Song';
    value: string;
  };
  const optionData: optionType[] = [
    {title: '요일 반복', navigateTo: 'Repeat', value: '안 함'},
    {title: '이름', navigateTo: 'Message', value: state.message},
    {title: '벨소리', navigateTo: 'Song', value: state.soundName},
  ];

  return (
    <View style={[styles.view]}>
      <DatePicker
        mode="time"
        textColor={theme.color.white}
        androidVariant="iosClone"
        locale="fr" //for 24 hour format on IOS
        is24hourSource="locale" //for 24 hour format on android
        date={state.date}
        onDateChange={picked => dispatch(updateAction('date', picked))}
      />
      <View style={[styles.tapListView]}>
        <FlatList
          data={optionData}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.navigateTo)}>
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
                    {fontSize: theme.fontSize.sm, color: theme.color.text_grey},
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
