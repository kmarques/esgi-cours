import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = () => {
  const [count, setCount] = useState(null);

  const onSave = () => {
    AsyncStorage.setItem('count', JSON.stringify(count)).then(() =>
      alert('saved'),
    );
  };
  const onAdd = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    AsyncStorage.getItem('count').then(data => setCount(data));
  }, []);

  return (
    <Card style={styles.card}>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Title>Card title {count} </Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      <Card.Actions>
        <Button onPress={() => alert('test')}>Cancel</Button>
        <Button onPress={onAdd}>+1</Button>
        <Button onPress={onSave}>Save</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default HomeScreen;
