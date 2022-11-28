import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SOUND} from '@common/constant';
import {useCreateAlarm, updateAction} from '../../../contexts/CreateAlarm';
import {RootStackParamList} from 'App';
import theme from '@common/theme';
import Icon from '@common/Icon';
import {styles} from './AlarmDetail.styles';

type songScreenProps = StackNavigationProp<RootStackParamList, 'Song'>;

export default function Song() {
  const navigation = useNavigation<songScreenProps>();
  const {state, dispatch} = useCreateAlarm();
  const [sound, setSound] = useState<string>(state.soundName);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            dispatch(updateAction('soundName', sound));
            navigation.goBack();
          }}>
          <Text style={styles.headerRight}>Done</Text>
        </Pressable>
      ),
    });
  }, [sound]);
  return (
    <View style={styles.view}>
      <View style={[styles.listView]}>
        <FlatList
          data={Object.values(SOUND)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setSound(item)}>
              <View style={[styles.itemView]}>
                <Text style={styles.itemText}>{item}</Text>
                {sound === item ? (
                  <Icon
                    name="Check"
                    size={20}
                    color={theme.color.text_primary}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
