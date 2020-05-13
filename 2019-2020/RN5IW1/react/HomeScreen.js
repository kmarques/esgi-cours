import React, {useState, useEffect} from 'react';
import {Title, Card, Paragraph, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native';

const HomeScreen = () => {
  const [count, setCount] = useState(null);
  const [logged, setLogged] = useState(null);

  const onSave = () => {
    AsyncStorage.setItem('count', JSON.stringify(count)).then(() =>
      alert('saved'),
    );
  };

  const checkSigin = async () => {
    const test = await AsyncStorage.getItem('count');
    console.log(test);
    return test;
  };

  useEffect(() => {
    checkSigin().then(data => setLogged(!!data));
    fetch('https://api-beta.vetixy.com/animals')
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);

  if (logged === null) {
    return <ActivityIndicator />;
  }

  return (
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Title>Card title {(logged && 'logged') || 'not logged'}</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button onPress={() => setCount(count + 1)}>+1</Button>
        <Button onPress={onSave}>save</Button>
      </Card.Actions>
    </Card>
  );
};

export default HomeScreen;
