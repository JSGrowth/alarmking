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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.black,
  },
  text: {
    marginTop: 30,
    fontSize: 18,
    color: color.grey99,
    fontFamily: 'NotoSansKR-Regular',
  },
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    width: '95%',
    marginTop: 10,
    padding: 5,
    fontSize: 24,
    borderRadius: 5,
    backgroundColor: color.grey30,
    color: color.white,
  },
  listView: {
    flex: 1,
    backgroundColor: color.black,
  },
  tapListView: {
    flexDirection: 'column',
    marginTop: 24,
    width: '100%',
  },
  tapItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  tapItemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: theme.fontSize.lg,
    color: theme.color.grey600,
  },
});
