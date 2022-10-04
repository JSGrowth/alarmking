import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './srcs/screen/TabNavigator';
import {makeStore} from './srcs/store';
import {Provider as ReduxProvider} from 'react-redux';

const store = makeStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
