import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ModalStackParamList} from '../Main';
import {styles} from './ButtonList.styles';
import {SOUND} from '../../libs/alarm';
import {useCreateAlarm, updateAction} from '../../contexts/CreateAlarm';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <Text
            style={[{fontSize: 18, color: Colors.blue500, fontWeight: '600'}]}>
            Done
          </Text>
        </Pressable>
      ),
    });
  }, [sound, navigation]);
  return (
    <View style={[styles.tapListView]}>
      <FlatList
        data={Object.values(SOUND)}
        ItemSeparatorComponent={() => <View style={[styles.separator]} />}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setSound(item)}>
            <View style={[styles.tapItemView]}>
              <Text
                style={[{marginLeft: 20, fontSize: 20, color: Colors.grey600}]}>
                {item}
              </Text>
              {sound === item ? (
                <Icon name="checkmark" size={20} color={Colors.orange500} />
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default Song;
