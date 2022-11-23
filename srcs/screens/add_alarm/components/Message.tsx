import React, {useLayoutEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {AutoFocusProvider, useAutoFocus} from '../../../contexts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCreateAlarm, updateAction} from '../../../contexts/CreateAlarm';
import {styles} from './AlarmDetail.styles';
import {RootStackParamList} from 'App';
import theme from '@common/theme';

type messageScreenProps = StackNavigationProp<RootStackParamList, 'Message'>;

const Message = () => {
  const navigation = useNavigation<messageScreenProps>();
  const {state, dispatch} = useCreateAlarm();
  const color = theme.color;
  const [message, setMessage] = useState<string>(state.message);
  const focus = useAutoFocus();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            dispatch(updateAction('message', message));
            navigation.goBack();
          }}>
          <Text
            style={[{fontSize: 18, color: color.primary, fontWeight: '600'}]}>
            Done
          </Text>
        </Pressable>
      ),
    });
  }, [message, navigation]);

  return (
    <View style={[styles.view]}>
      <Text style={[styles.text]}>set your message</Text>
      <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
        <TextInput
          defaultValue={message}
          onChangeText={text => setMessage(text)}
          onFocus={focus}
          style={[styles.textInput]}
        />
      </AutoFocusProvider>
    </View>
  );
};

export default Message;
