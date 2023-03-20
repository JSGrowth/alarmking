import React, {useRef} from 'react';
import theme, {fontSize} from '@common/theme';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';

type optionPropsType = {
  value: number;
  answer: number;
  handlePress: () => void;
};

export default function OptionItem({
  value,
  answer,
  handlePress,
}: optionPropsType) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const handleAnswer = (
    value: number,
    answer: number,
    callback: () => void,
  ) => {
    let toVal = 0;
    value === answer ? (toVal = 1) : (toVal = -1);
    Animated.timing(animatedValue, {
      toValue: toVal,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    callback();
  };
  const interpolatedColor = animatedValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [color.error, color.text_grey, color.text_primary],
    // outputRange: [0, 1, 0],
  });

  return (
    <Animated.View style={[styles.view, {borderColor: interpolatedColor}]}>
      {/*<Animated.View style={[styles.view, {opacity: interpolatedColor}]}> */}
      <Pressable
        onPress={() => handleAnswer(value, answer, handlePress)}
        style={[styles.button]}>
        <Animated.Text style={[styles.text]} children={`${value}`} />
      </Pressable>
    </Animated.View>
  );
}
const {color, fontFamily} = theme;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    borderStyle: 'solid',
    // borderColor: color.text_grey,
    borderWidth: 2,
    borderRadius: 30,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  button: {
    alignItems: 'center',
    marginVertical: 12,
  },
  text: {
    color: color.white,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.lg,
  },
});
