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
import HomeScreen2 from './react/HomeScreen2';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name={'Home'}
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                  <Icon name="history" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen name={'Home2'} component={HomeScreen2} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
