import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {
  Animated,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import theme from '@common/theme';
import {CreateAlarmType} from '@srcs/contexts/CreateAlarm';
import Icon from '@common/Icon';
// import {AlarmType} from '@common/types';
// import {deleteAlarmById, switchAlarmById} from '@srcs/libs/alarm';

type listItemProps = CreateAlarmType & {
  setUpdated: Dispatch<SetStateAction<boolean>>;
  listHeight: number;
  index: number;
  scrollY: Animated.Value;
};

export default function ListItem(props: listItemProps) {
  const {active, date, message, setUpdated, index, listHeight, scrollY} = props;
  const [itemHeight, setItemHeight] = useState<number>(0);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<any>,
    dragAnimatedValue: Animated.AnimatedInterpolation<any>,
  ) => {
    const scale = dragAnimatedValue.interpolate({
      inputRange: [-50, 0],
      outputRange: [0, 5],
    });
    return (
      <Animated.View
        style={[styles.rightActionView, {transform: [{translateX: scale}]}]}>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.2 : 1}]}
          // onPress={() => deleteAlarmById(oid).then(() => setUpdated(true))}
        >
          <Icon name="Trash" color={theme.color.text_primary} size={30} />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      childrenContainerStyle={{backgroundColor: theme.color.black}}
      renderRightActions={renderRightActions}>
      <Animated.View
        onLayout={e => setItemHeight(e.nativeEvent.layout.height)}
        style={[
          viewStyle(active).itemView,
          {
            opacity: scrollY.interpolate({
              inputRange: [
                (itemHeight + 16) * index - (listHeight - 200), // 16: margin, 200: header
                (itemHeight + 16) * (index + 1) - (listHeight - 200),
              ],
              outputRange: [0.6, 1],
            }),
          },
        ]}>
        <View style={[styles.timeView]}>
          <Text style={[styles.timeText]}>{moment(date).format('HH:mm')}</Text>
          <Switch
            trackColor={{true: theme.color.primary, false: theme.color.black}}
            value={active}
            // onChange={() => switchAlarmById(props).then(() => setUpdated(true))}
          />
        </View>
        <View style={[styles.messageView]}>
          <Text style={[styles.messageText]}>{message}</Text>
          <Text style={[styles.messageText]}>{moment(date).fromNow()}</Text>
        </View>
      </Animated.View>
    </Swipeable>
  );
}
const viewStyle = (active: boolean) =>
  StyleSheet.create({
    itemView: {
      display: 'flex',
      opacity: active ? 1 : 0.35,
      flexDirection: 'column',
      marginVertical: 8,
      paddingTop: 4,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.color.background_grey,
    },
  });
const styles = StyleSheet.create({
  itemView: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 8,
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.color.background_grey,
  },

  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: theme.color.white,
    fontSize: theme.fontSize.xl,
    fontFamily: 'NotoSansKR-Medium',
  },
  messageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageText: {
    fontSize: theme.fontSize.sm,
    color: theme.color.text_grey,
    fontFamily: 'NotoSansKR-Regular',
  },

  /* Swipeables */
  rightActionView: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.color.error,
    marginVertical: 8,
  },
});
