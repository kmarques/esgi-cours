import React, {createContext, useState, useReducer} from 'react';
import {login} from './actions/security';
import AsyncStorage from '@react-native-community/async-storage';
import securityReducer from './reducers/security';

export const AuthContext = createContext();

const initialState = {
  user: {},
};

const reducer = (state, action) => {
  state = securityReducer(state, action);
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectors = {
    getUser: () => state.user,
    isLogged: () => state.user !== null,
  };

  const actions = {
    setUser: async _user => {
      const data = await login();
      await AsyncStorage.setItem('jwt', JSON.stringify(data));
      dispatch({
        type: 'LOG_USER',
        payload: _user,
      });
    },
  };

  return (
    <AuthContext.Provider value={{selectors, actions}}>
      {children}
    </AuthContext.Provider>
  );
};
