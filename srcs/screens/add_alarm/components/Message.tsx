import React, {useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {AutoFocusProvider, useAutoFocus} from '../../../contexts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCreateAlarm, updateAction} from '../../../contexts/CreateAlarm';
import {styles} from './AlarmDetail.styles';
import {RootStackParamList} from 'App';
import theme from '@common/theme';

type messageScreenProps = StackNavigationProp<RootStackParamList, 'Message'>;

const {color, fontFamily} = theme;

export default function Message() {
  const navigation = useNavigation<messageScreenProps>();
  const {state, dispatch} = useCreateAlarm();
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
          <Text style={styles.headerRight}>Done</Text>
        </Pressable>
      ),
    });
  }, [message]);

  return (
    <View style={[styles.view]}>
      <Text style={[messageStyles.text]}>메세지를 입력하세요.</Text>
      <AutoFocusProvider
        contentContainerStyle={[messageStyles.keyboardAwareFocus]}>
        <TextInput
          defaultValue={message}
          onChangeText={text => setMessage(text)}
          onFocus={focus}
          style={[messageStyles.textInput]}
        />
      </AutoFocusProvider>
    </View>
  );
}

const messageStyles = StyleSheet.create({
  text: {
    marginTop: 30,
    fontSize: 18,
    color: color.text_grey,
    fontFamily: fontFamily.regular,
  },
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    width: '95%',
    marginTop: 10,
    padding: 5,
    fontSize: 24,
    borderRadius: 5,
    backgroundColor: color.background_grey,
    color: color.white,
  },
});
