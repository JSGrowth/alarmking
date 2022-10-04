import React from 'react';
import {styles} from './ListItem.style';
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import {Animated, Switch, Text, View} from 'react-native';
import {AlarmType, deleteAlarmById, switchAlarmById} from '../libs/alarm';
import moment from 'moment';

const ListItem = (props: AlarmType) => {
  const {oid, active, date, title, message} = props;
  return (
    <Swipeable
      renderRightActions={(progress, dragAnimatedValue) =>
        renderRightActions(progress, dragAnimatedValue)
      }
      friction={1.5}
      onSwipeableOpen={() => {
        deleteAlarmById(oid);
      }}>
      <View style={[styles.itemView]}>
        <View style={[styles.timeView]}>
          <Text style={[styles.timeText]}>{moment(date).format('HH:mm')}</Text>
          <Switch
            value={active}
            onChange={() => {
              switchAlarmById(props);
            }}
          />
        </View>
        <View style={[styles.messageView]}>
          <Text style={[styles.messageText]}>
            {title},{message}
          </Text>
          <Text style={[styles.messageText]}>{moment(date).fromNow()}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const renderRightActions = (
  progress: Animated.AnimatedInterpolation<any>,
  dragAnimatedValue: Animated.AnimatedInterpolation<any>,
) => {
  const scale = dragAnimatedValue.interpolate({
    inputRange: [-50, 0],
    outputRange: [1, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.rightActionView, {transform: [{scale}]}]}>
      <TouchableOpacity>
        <Text style={styles.rightActionText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ListItem;
