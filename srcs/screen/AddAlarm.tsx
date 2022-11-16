import React, {useLayoutEffect} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, View, Switch, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParamList} from './Main';
import {createAlarm} from '../libs/alarm';
import {styles} from './AddAlarm.style';
import {useAlarmUpdate} from '../contexts/useAlarmUpdate';
import {useCreateAlarm, updateAction} from '../contexts/CreateAlarm';
import theme from '../styles/theme';

type AlarmScreenProp = StackNavigationProp<ModalStackParamList, 'AddAlarm'>;

const AddAlarm = () => {
  const navigation = useNavigation<AlarmScreenProp>();
  const {setUpdated} = useAlarmUpdate();
  const {state, dispatch} = useCreateAlarm();
  const handleDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date) dispatch(updateAction('date', date));
  };
  // const handleCreate = useCallback(() => {
  //   console.log(state);
  //   createAlarm({...state}).then(() => {
  //     setUpdated(true);
  //     navigation.goBack();
  //   });
  // }, [state]);
  // todo: state 변경마다 re render?? optimal하게 바꿔보기
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: theme.color.white,
      headerLeft: () => (
        <Icon
          name="ios-chevron-back"
          size={30}
          style={{color: theme.color.primary}}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <Icon
          name="checkmark-sharp"
          size={30}
          style={{color: theme.color.primary}}
          onPress={() =>
            createAlarm({...state}).then(() => {
              setUpdated(true);
              navigation.goBack();
            })
          }
        />
      ),
    });
  }, [state, navigation]);

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
};

export default AddAlarm;
