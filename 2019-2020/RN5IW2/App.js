/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import HomeScreen from './react/HomeScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
        <PaperProvider>
          <HomeScreen />
        </PaperProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
