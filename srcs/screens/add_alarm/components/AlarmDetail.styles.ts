import theme from '@common/theme';
import {StyleSheet} from 'react-native';

const {color, fontSize, fontFamily} = theme;

export const styles = StyleSheet.create({
  headerRight: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: color.text_primary,
  },
  view: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.black,
  },

  listView: {
    flexDirection: 'column',
    marginTop: 24,
    width: '100%',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  itemText: {
    fontSize: fontSize.lg,
    color: color.text_grey,
    fontFamily: fontFamily.regular,
  },
});
