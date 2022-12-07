import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Animated, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import theme from '@common/theme';
import OptionItem from './components/OptionItem';

const optionData = [31, 16, 15, 40];

export default function Math() {
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

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={[styles.timeview]}>
        <Animated.Text
          style={[
            styles.text,
            {opacity: fadeOut, transform: [{translateY: translationy}]},
          ]}>
          07 : 30
        </Animated.Text>
        <Animated.Text style={[styles.text, {opacity: fadeIn}]}>
          1 + 3 x 10
        </Animated.Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={optionData}
          numColumns={2}
          keyExtractor={item => item.toString()}
          contentContainerStyle={{flex: 1, justifyContent: 'flex-end'}}
          renderItem={({item}) => (
            <OptionItem value={item} answer={1 + 3 * 10} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const {color, fontFamily, fontSize} = theme;
const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: color.black,
  },
  timeview: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: 60,
    color: color.white,
  },
});
