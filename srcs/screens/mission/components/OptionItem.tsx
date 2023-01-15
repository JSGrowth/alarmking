import React from 'react';
import theme, {fontSize} from '@common/theme';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';

type optionPropsType = {
  value: number;
  answer: number;
  handlePress: (answer: number, value: number) => boolean;
};

export default function OptionItem({value, handlePress}: optionPropsType) {
  return (
    <Animated.View style={[styles.view]}>
      <Pressable onPress={() => handlePress} style={[styles.button]}>
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
    borderColor: color.text_grey,
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
