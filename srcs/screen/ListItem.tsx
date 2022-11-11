import React from 'react';
import {styles} from './ListItem.style';
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import {Animated, Switch, Text, View} from 'react-native';
import {AlarmType, deleteAlarmById, switchAlarmById} from '../libs/alarm';
import moment from 'moment';
import {useAlarmUpdate} from '../contexts/useAlarmUpdate';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const ListItem = (props: AlarmType) => {
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
};

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
        <Icon name="trash" size={30} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ListItem;
