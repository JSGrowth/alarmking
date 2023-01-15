import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Animated, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import theme from '@common/theme';
import OptionItem from './components/OptionItem';

export default function MathQuiz() {
  const makeQuiz = () => {
    const a = Math.floor(Math.random() * 100) + 1;
    const b = Math.floor(Math.random() * 100) + 1;
    const op = ['*', '+', '-'][Math.floor(Math.random() * 4)];
    return a + ' ' + op + ' ' + b;
  };
  const fadeOut = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const translationy = useRef(new Animated.Value(0)).current;
  const quiz = makeQuiz();
  const answer = parseInt(eval(quiz));
  const optionData: number[] = [];
  for (let i = 0; i < 3; i++)
    optionData.push(
      answer +
        Math.ceil(Math.random() * 20) * (Math.round(Math.random()) ? 1 : -1),
    );
  optionData.push(answer);
  optionData.sort();
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
          {quiz.replace('*', 'x')}
        </Animated.Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={optionData}
          numColumns={2}
          keyExtractor={item => item.toString()}
          contentContainerStyle={{flex: 1, justifyContent: 'flex-end'}}
          renderItem={({item}) => <OptionItem value={item} answer={answer} />}
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
