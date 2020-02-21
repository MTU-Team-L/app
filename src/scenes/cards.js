import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import {View, Text, SafeAreaView, Button, FlatList, Alert} from 'react-native';
import {Cards} from '../utils/db';

const CardsScene = ({navigation}) => {
  // Add plus button to top
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Add" onPress={() => Alert.alert('Add a card', 'I want to', [
          {text: 'Add it manually', onPress: () => navigation.navigate('Add-Card-Manually')},
          {text: 'Scan it with my camera', onPress: () => navigation.navigate('Add-Card-Scan')}
        ])}/>
    )
  });

  // Row for list view
  const Item = ({name, onPress}) => (
    <View>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );

  const [cards, setCards] = useGlobal('cards');

  // Run once on mount
  useEffect(() => {
    const fetchData = async () => {
      let {rows: cards} = await Cards.allDocs({include_docs: true});

      // Hoist
      cards = cards.map(c => c.doc);

      setCards(cards);
    };

    fetchData();
  }, [setCards]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={cards}
        renderItem={({item}) => (
          <Item
            name={item.name} onPress={() => navigation.navigate('Card-Details', item)}/>
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

export default CardsScene;
