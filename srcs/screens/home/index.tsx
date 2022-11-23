import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, SafeAreaView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getAlarms} from '../../libs/alarm';
import theme from '../../common/theme';
import {AlarmType} from '@common/type';
import ListItem from './components/ListItem';
import {RootStackParamList} from 'App';

/*
We recommend creating a separate types.tsx file where you keep
the types and import them in your component files
instead of repeating them in each file.
*/
type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<homeScreenProp>();
  const [alarmList, setAlarmList] = useState<AlarmType>([]);
  const [updated, setUpdated] = useState<boolean>(true);
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
        <Icon
          name="add"
          color={theme.color.text_primary}
          size={30}
          onPress={() => navigation.navigate('AddAlarm', {setUpdated})}
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
          keyExtractor={item => item.oid}
          renderItem={(result: {item: AlarmType}) => (
            <ListItem {...result.item} setUpdated={setUpdated} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
