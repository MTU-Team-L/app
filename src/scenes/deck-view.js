import React from 'react';
import {SearchBar, ListItem} from 'react-native-elements';
import {Button, SafeAreaView, FlatList, Alert} from 'react-native';
import {Decks} from '../utils/db';

// Deck View Scence
const DecksScene = ({route, navigation}) => {
  const t = route.params.cardList;
  console.log(t);
  navigation.setOptions({
    headerRight: () => (

      <Button
        title="Manage" onPress={() => Alert.alert('What would you like to do?', '', [
          {
            text: 'Add a card', onPress: async () => {
              navigation.navigate('Deck-Manage', route.params, navigation);
            }
          },
          {
            text: 'Delete this deck', onPress: async () => {
              await Decks.remove(route.params);
              navigation.navigate('Decks');
            }
          },
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}

        ])}/>
    )

  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        onChangeText={console.log}
      />

      <FlatList
        data={t}

        renderItem={({item}) => (
          <ListItem bottomDivider chevron title={item.name} onPress={() => navigation.navigate('Card-Details', item)}/>
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>

  );
};

export default DecksScene;
