import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Animated,
  LayoutRectangle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {getAlarms} from '../../libs/alarm';
import theme from '../../common/theme';
import {AlarmType} from '@common/types';
import ListItem from './components/ListItem';
import {RootStackParamList} from 'App';
import Icon from '@common/Icon';
import {SCREEN_HEIGHT} from '@common/constant';
// import {getAlarm} from '@srcs/libs/alarm/get';

/*
We recommend creating a separate types.tsx file where you keep
the types and import them in your component files
instead of repeating them in each file.
*/
type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<homeScreenProp>();
  // const [alarmList, setAlarmList] = useState<AlarmType>();
  const [listHeight, setListHeight] = useState<number>(0);
  const alarmList: AlarmType[] = [
    {id: '1', title: 'hello', repeatDays: []},
    {id: '2', title: 'hello', repeatDays: []},
    {id: '3', title: 'hello', repeatDays: []},
    {id: '4', title: 'hello', repeatDays: []},
    {id: '5', title: 'hello', repeatDays: []},
    {id: '6', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
    {id: '7', title: 'hello', repeatDays: []},
  ];
  const [updated, setUpdated] = useState<boolean>(true);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Text
          style={{
            fontFamily: 'NotoSansKR-Regular',
            fontSize: theme.fontSize.md,
            color: theme.color.text_primary,
          }}>
          편집
        </Text>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('AddAlarm', {setUpdated})}>
          <Icon name="Add" color={theme.color.text_primary} size={30} />
        </Pressable>
      ),
    });
  }, []);
  useEffect(() => {
    if (updated) {
      // getAlarms().then(response => setAlarmList([...response]));
      setUpdated(false);
    }
  }, [updated]);
  return (
    <SafeAreaView style={[{flex: 1, backgroundColor: theme.color.black}]}>
      <View
        style={{flex: 9}}
        onLayout={e => setListHeight(e.nativeEvent.layout.height)}>
        <Animated.FlatList
          scrollEnabled={true}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          data={alarmList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <ListItem
              active={true}
              date={new Date()}
              message={'hello'}
              soundName={'marimba'}
              setUpdated={setUpdated}
              scrollY={scrollY}
              index={index}
              listHeight={listHeight}
            />
          )}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: theme.color.text_grey,
            fontSize: theme.fontSize.lg,
          }}>
          다음 알람이 몇 분 뒤에 울립니다.
        </Text>
      </View>
    </SafeAreaView>
  );
}
