import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const color = theme.color;

export const styles = StyleSheet.create({
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
});
