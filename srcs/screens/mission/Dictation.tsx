import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import theme from '@common/theme';

const dictation = '이미 늦음 이미 늦음 이미 늦음 이미 늦음 이미 늦음 ';

export default function Dictaion() {
  const [text, setText] = useState<string>('');
  const fadeOut = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const translationy = useRef(new Animated.Value(0)).current;
  const animatedView = (
    toValue: number,
    animatedRef: Animated.Value,
    duration: number,
    delay: number,
  ) => {
    return Animated.timing(animatedRef, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    });
  };

  useEffect(() => {
    Animated.parallel([
      animatedView(0.25, fadeOut, 1000, 0),
      animatedView(-100, translationy, 1000, 0),
      animatedView(1, fadeIn, 1000, 0),
    ]).start();
  }, []);

  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.safeareaview}>
        <View style={[styles.timeview]}>
          <Animated.Text
            style={[
              styles.text,
              {
                fontSize: 60,
                opacity: fadeOut,
                transform: [{translateY: translationy}],
              },
            ]}>
            07 : 30
          </Animated.Text>
          <Animated.Text style={[styles.text, {opacity: fadeIn}]}>
            {dictation}
          </Animated.Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TextInput
            placeholder="텍스트를 입력하세요."
            style={styles.textInput}
            autoFocus={true}
            value={text}
            onChangeText={t => setText(t)}
            onSubmitEditing={handleSubmit}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const {color, fontFamily, fontSize} = theme;
const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: color.black,
    justifyContent: 'space-between',
  },
  keyboardView: {
    flex: 1,
  },
  timeview: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: 30,
    textAlign: 'center',
    color: color.white,
  },
  textInput: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontSize: fontSize.lg,
    backgroundColor: '#111111',
    borderRadius: 12,
    color: color.white,
  },
});
