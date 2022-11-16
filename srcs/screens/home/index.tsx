import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, SafeAreaView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../Main';
import {StackNavigationProp} from '@react-navigation/stack';
import {getAlarms} from '../../libs/alarm';
import {useAlarmUpdate} from '../../contexts/useAlarmUpdate';
import theme from '../../common/theme';
import {AlarmType} from '@common/type';
import ListItem from './components/ListItem';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<homeScreenProp>();
  const [alarmList, setAlarmList] = useState<AlarmType>([]);
  const {updated, setUpdated} = useAlarmUpdate();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitle: '👑alarmking',
      headerTintColor: theme.color.white,
      headerLeft: () => (
        <Text
          style={[
            {
              fontFamily: 'NotoSansKR-Regular',
              fontSize: theme.fontSize.md,
              color: theme.color.text_primary,
            },
          ]}>
          편집
        </Text>
      ),
      headerRight: () => (
        <Icon
          name="add"
          color={theme.color.text_primary}
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
      <View style={{flex: 1}}>
        <FlatList
          scrollEnabled={true}
          data={alarmList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(result: {item: AlarmType}) => (
            <ListItem {...result.item} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
