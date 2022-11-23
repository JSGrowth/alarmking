import React, {useLayoutEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {AutoFocusProvider, useAutoFocus} from '../../../contexts';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParamList} from '../../Main';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCreateAlarm, updateAction} from '../../../contexts/CreateAlarm';
import theme from '../../../common/theme';
import {styles} from './AlarmDetail.styles';

type messageScreenProps = StackNavigationProp<ModalStackParamList, 'Message'>;

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

// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: theme.color.black,
//   },
//   text: {
//     marginTop: 30,
//     fontSize: 18,
//     color: color.grey99,
//   },
//   keyboardAwareFocus: {
//     flex: 1,
//     padding: 5,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   textInput: {
//     width: '95%',
//     marginTop: 10,
//     padding: 5,
//     fontSize: 24,
//     borderRadius: 5,
//     backgroundColor: color.grey30,
//     color: color.white,
//   },
// });
export default Message;
