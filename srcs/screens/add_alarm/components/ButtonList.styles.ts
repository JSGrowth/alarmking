import {StyleSheet} from 'react-native';
import theme from '../../../common/theme';

const color = theme.color;

export const styles = StyleSheet.create({
  headerRight: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: theme.fontSize.md,
    color: theme.color.text_primary,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.black,
  },
  tapListView: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
  },
  tapItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    margin: 8,
  },
  tapItemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: theme.fontSize.lg,
    color: theme.color.grey600,
  },
});
