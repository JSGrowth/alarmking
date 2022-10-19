import {StyleSheet} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tapListView: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: Colors.grey200,
  },
  tapItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    marginLeft: 12,
    marginRight: 12,
    margin: 10,
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: 'lightgray',
  },
});
