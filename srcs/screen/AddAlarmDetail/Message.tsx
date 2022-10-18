import React, {forwardRef, useLayoutEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ModalStackParamList} from '../Main';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

type messageScreenProps = StackNavigationProp<ModalStackParamList, 'Message'>;
type messageRouteProp = RouteProp<ModalStackParamList, 'Message'>;

const Message = () => {
  const navigation = useNavigation<messageScreenProps>();
  const [message, setMessage] = useState<String>();
  const route = useRoute<messageRouteProp>();
  const focus = useAutoFocus();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="chevron-forward-outline"
          size={30}
          style={{borderRadius: 5}}
        />
        // <Pressable
        //   onPress={() => {
        //     // route?.params?.dispatch('hello');
        //     // console.log(messageRef.current);
        //     navigation.goBack();
        //   }}>
        //   <Text
        //     style={[{fontSize: 18, color: Colors.blue500, fontWeight: '600'}]}>
        //     Done
        //   </Text>
        // </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={[styles.view]}>
      <Text style={[styles.text]}>set your message</Text>
      <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
        <TextInput
          // ref={messageRef}
          onFocus={focus}
          style={[styles.textInput]}
        />
      </AutoFocusProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    marginTop: 30,
    fontSize: 18,
    color: Colors.grey800,
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
    backgroundColor: Colors.grey300,
  },
});
export default Message;
