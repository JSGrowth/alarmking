import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollEnabledProvider, useScrollEnabled} from '../contexts';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './Main';
import {StackNavigationProp} from '@react-navigation/stack';
import ListItem from './ListItem';
import {AlarmType, deleteAllAlarms, getAlarms} from '../libs/alarm';
import {useAlarmUpdate} from '../contexts/useAlarmUpdate';
import theme from '../styles/theme';
import {Text} from 'react-native-paper';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const [scrollEnabled] = useScrollEnabled();
  const navigation = useNavigation<homeScreenProp>();
  const [alarmList, setAlarmList] = useState<AlarmType>([]);
  const {updated, setUpdated} = useAlarmUpdate();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerLeft: () => (
        <Text
          style={[
            {
              fontFamily: 'NotoSansKR-Regular',
              fontSize: theme.fontSize.lg,
              color: theme.color.primary,
            },
          ]}>
          편집
        </Text>
      ),
      headerRight: () => (
        <Icon
          name="add"
          color={theme.color.primary}
          size={30}
          onPress={() =>
            navigation.navigate({key: 'AddAlarmModal', name: 'AddAlarmModal'})
          }
        />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    if (updated) {
      getAlarms().then(response => setAlarmList([...response]));
      setUpdated(false);
    }
  }, [updated]);

  return (
    <SafeAreaView style={[{flex: 1, backgroundColor: theme.color.black}]}>
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
