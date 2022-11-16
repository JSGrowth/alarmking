import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Main from './srcs/screen/Main';

const App = () => {
  return (
    <NavigationContainer>
      {/* <TabNavigator /> */}
      <Main />
    </NavigationContainer>
  );
};

export default App;
