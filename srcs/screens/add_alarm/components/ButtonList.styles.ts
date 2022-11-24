import theme from '@common/theme';
import {StyleSheet} from 'react-native';

const color = theme.color;

export const styles = StyleSheet.create({
  headerRight: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: theme.fontSize.md,
    color: theme.color.text_primary,
  },
  view: {
    flex: 1,
    backgroundColor: color.black,
  },
  tapListView: {
    flexDirection: 'column',
    width: '100%',
  },
  tapItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  tapItemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: theme.fontSize.lg,
    color: theme.color.grey600,
  },
});
