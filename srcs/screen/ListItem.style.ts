import {StyleSheet} from 'react-native';
import theme, {color} from '../styles/theme';

export const styles = StyleSheet.create({
  itemView: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 8,
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    // opacity: 0.5, // 0 ~ 1
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
    justifyContent: 'center',
    // alignItems: 'flex-end',
    justifyItems: 'center',
    backgroundColor: theme.color.primary,
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 16,
    // paddingBottom: 12,
    // paddingHorizontal: 16,
    borderRadius: 20,
  },
});
