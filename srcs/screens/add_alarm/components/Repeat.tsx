import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {REPEAT} from '@common/constant';
import {styles} from './ButtonList.styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'App';
import {useCreateAlarm} from '@srcs/contexts/CreateAlarm';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '@common/theme';

type songScreenProps = StackNavigationProp<RootStackParamList, 'Repeat'>;

const Repeat = () => {
  const navigation = useNavigation<songScreenProps>();
  const {state, dispatch} = useCreateAlarm();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            // dispatch(updateAction('soundName', state));
            navigation.goBack();
          }}>
          <Text style={styles.headerRight}>Done</Text>
        </Pressable>
      ),
    });
  }, []);
  return (
    <View style={styles.view}>
      <View style={styles.tapListView}>
        <FlatList
          data={Object.values(REPEAT)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.tapItemView}>
                <Text style={styles.tapItemText}>{item}</Text>
                <Icon
                  name="checkmark-sharp"
                  size={20}
                  color={theme.color.primary}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Repeat;
