import theme, {fontSize} from '@common/theme';
import React, {useRef} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';

type optionPropsType = {
  value: number;
  answer: number;
};

export default function OptionItem({value, answer}: optionPropsType) {
  const anValue = useRef(new Animated.Value(0)).current;
  const colorAnimatedTo =
    value === answer ? theme.color.text_primary : theme.color.error;
  const handlePress = () => {
    Animated.timing(anValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(anValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };
  const colorInterpolation = anValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.color.text_grey, colorAnimatedTo],
  });

  return (
    <Animated.View style={[styles.view]}>
      <Pressable onPress={handlePress} style={[styles.button]}>
        <Animated.Text
          style={[styles.text, {color: colorInterpolation}]}
          children={`${value}`}
        />
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
    borderWidth: 1,
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
    fontFamily: fontFamily.light,
    fontSize: fontSize.lg,
  },
});
