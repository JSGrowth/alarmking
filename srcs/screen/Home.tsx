import React, {useLayoutEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollEnabledProvider, useScrollEnabled} from '../contexts';
import {useNavigation} from '@react-navigation/native';
// prettier-ignore
import {RootStackParamList} from './StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import ListItem from './ListItem';
import {AlarmType, deleteAllAlarms, getAlarms} from '../libs/alarm';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const [scrollEnabled] = useScrollEnabled();
  const navigation = useNavigation<homeScreenProp>();
  const [alarmList, setAlarmList] = useState<AlarmType>([]);
  useLayoutEffect(() => {
    getAlarms().then(response => setAlarmList([...response]));
    navigation.setOptions({
      headerLeft: () =>
        //prettier-ignore
        <Icon name="trash-can-outline" size={30} onPress={() => {deleteAllAlarms()}}/>,
      headerTitle: 'Alarm',
      headerRight: () =>
        //prettier-ignore
        <Icon name="plus" size={30} onPress={() => navigation.navigate({key: 'AddAlarmModal', name: 'AddAlarmModal'})} />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={[{flex: 1}]}>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <FlatList
            scrollEnabled={scrollEnabled}
            data={alarmList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(result: {item: AlarmType}) => (
              <ListItem {...result.item} />
            )}
          />
        </View>
      </ScrollEnabledProvider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  view: {flex: 1},
  text: {marginRight: 10, fontSize: 20},
});
