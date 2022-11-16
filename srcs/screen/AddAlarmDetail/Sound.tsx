import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ModalStackParamList} from '../Main';
import {styles} from './ButtonList.styles';
import {SOUND} from '../../libs/alarm';
import {useCreateAlarm, updateAction} from '../../contexts/CreateAlarm';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';

type songScreenProps = StackNavigationProp<ModalStackParamList, 'Song'>;

const Song = () => {
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
  }, [sound, navigation]);
  return (
    <View style={styles.view}>
      <View style={[styles.tapListView]}>
        <FlatList
          data={Object.values(SOUND)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setSound(item)}>
              <View style={[styles.tapItemView]}>
                <Text style={styles.tapItemText}>{item}</Text>
                {sound === item ? (
                  <Icon
                    name="checkmark-sharp"
                    size={20}
                    color={theme.color.primary}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
export default Song;
