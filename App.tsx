import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
// import {Provider as ReduxProvider} from 'react-redux';
import TabNavigator from './srcs/screen/TabNavigator';

// const store = makeStore();

const App = () => {
  return (
    // <ReduxProvider store={store}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    // </ReduxProvider>
  );
};

export default App;
function makeStore() {
  throw new Error('Function not implemented.');
}
