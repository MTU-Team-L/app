import React from 'react';
import {SearchBar, ListItem} from 'react-native-elements';
import {Button, SafeAreaView, FlatList} from 'react-native';
import {usePouch} from '../utils/db';

// Deck View Scence
const DecksScene = ({navigation}) => {
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Add" onPress={() => navigation.navigate('Deck-Add', navigation)}

      />
    )
  });

  const [decks] = usePouch('decks');

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        onChangeText={console.log}
      />

      <FlatList
        data={decks}
        renderItem={({item}) => (
          <ListItem bottomDivider chevron title={item._id} onPress={() => navigation.navigate('Deck-View', item)}/>
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>

  );
};

export default DecksScene;
