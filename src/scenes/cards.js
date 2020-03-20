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
          {text: 'Add it manually', onPress: () => navigation.navigate('Add-Card-Manually')},
          {text: 'Scan it with my camera', onPress: () => navigation.navigate('Add-Card-Scan')}
        ])}/>
    )
  });

  const [cards] = usePouch('cards');
  const [searchValue, setSearchValue] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        value={searchValue}
        onChangeText={e => setSearchValue(e)}

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
