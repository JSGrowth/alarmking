import React from 'react';
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import {Animated, StyleSheet, Switch, Text, View} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '@common/theme';
import {AlarmType} from '@common/type';
import {deleteAlarmById, switchAlarmById} from '@srcs/libs/alarm';
import {useAlarmUpdate} from '../../../contexts';
// import {useAlarmUpdate} from 'srcs/contexts';

export default function ListItem(props: AlarmType) {
  const {setUpdated} = useAlarmUpdate();
  const {oid, active, date, message} = props;
  return (
    <Swipeable
      renderRightActions={(progress, dragAnimatedValue) =>
        renderRightActions(progress, dragAnimatedValue)
      }
      friction={1.5}
      onSwipeableOpen={() => deleteAlarmById(oid).then(() => setUpdated(true))}>
      <View
        style={active ? styles.itemView : [styles.itemView, {opacity: 0.35}]}>
        <View style={[styles.timeView]}>
          <Text style={[styles.timeText]}>{moment(date).format('HH:mm')}</Text>
          <Switch
            trackColor={{true: theme.color.primary, false: theme.color.black}}
            value={active}
            onChange={() => switchAlarmById(props).then(() => setUpdated(true))}
          />
        </View>
        <View style={[styles.messageView]}>
          <Text style={[styles.messageText]}>{message}</Text>
          <Text style={[styles.messageText]}>{moment(date).fromNow()}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

const renderRightActions = (
  progress: Animated.AnimatedInterpolation<any>,
  dragAnimatedValue: Animated.AnimatedInterpolation<any>,
) => {
  const scale = dragAnimatedValue.interpolate({
    inputRange: [-50, -30, 0],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.rightActionView, {transform: [{scale}]}]}>
      <TouchableOpacity>
        <Icon name="trash" color="#FFFFFF" size={30} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 8,
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.color.grey30,
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
    color: theme.color.grey99,
    fontFamily: 'NotoSansKR-Regular',
  },

  /* Swipeables */
  rightActionView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    justifyItems: 'center',
    //todo: color: system error
    borderWidth: 1,
    backgroundColor: theme.color.primary,
    marginVertical: 8,
    marginHorizontal: 10,
    padding: 16,
  },
});
