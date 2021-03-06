import React, {useState} from 'react';
import {SafeAreaView, Button, FlatList, Alert} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {usePouch} from '../utils/db';

const CardsScene = ({navigation}) => {
  // Add plus button to top
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Add" onPress={() => Alert.alert('Add a card', 'I want to', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Add it manually', onPress: () => navigation.navigate('Add-Card-Manually')},
          {text: 'Scan it with my camera', onPress: () => navigation.navigate('Add-Card-Scan')}

        ])}/>
    )
  });

  const [cards, setCardsFilter] = usePouch('cards');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInput = text => {
    setSearchValue(text);

    setCardsFilter({
      selector: {
        name: {
          $regex: new RegExp(`.*${text}.*`, 'i') // Anything can appear before/after text, (i)gnore case
        }
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        value={searchValue}
        onChangeText={handleSearchInput}
      />

      <FlatList
        data={cards}
        renderItem={({item}) => (
          <ListItem bottomDivider chevron title={item.name} onPress={() => navigation.navigate('Card-Details', item)}/>
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

export default CardsScene;
