import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {REPEAT} from '@common/constant';
import {styles} from './ButtonList.styles';

//  todo: repeatType?: 'week' | 'day' | 'hour' | 'minute' | 'time' | undefined; 뭐야...

const Repeat = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            // dispatch(updateAction('state', state));
            navigation.goBack();
          }}>
          <Text style={styles.headerRight}>Done</Text>
        </Pressable>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.view}>
      <View style={styles.tapItemView}>
        <FlatList
          data={Object.values(REPEAT)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.tapItemView}>
                <Text style={styles.tapItemText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Repeat;
