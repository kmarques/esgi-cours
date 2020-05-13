import React, {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const PrivateScreen = ({screenComponent: ScreenComponent, ...rest}) => {
  const {selectors} = useContext(AuthContext);
  const navigation = useNavigation();

  if (!selectors.isLogged()) {
    navigation.navigate('Login');
    return <></>;
  } else {
    return <ScreenComponent {...rest} />;
  }
};

export default PrivateScreen;
