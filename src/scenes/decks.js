import * as SearchBar from 'react-native-search-bar';
import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {Decks} from '../utils/db';

// Deck View Scence
const DecksScene = ({navigation}) => {
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Add" onPress={() => navigation.navigate('Deck-Add')}

      />
    )
  });

  // Row for list view
  const Item = ({name, onPress}) => (
    <View style={styles.row}>
      <Text style={styles.rowContent} onPress={onPress}>{name}</Text>
    </View>
  );

  const [decks, setDecks] = useGlobal('decks');

  // Run once on mount
  useEffect(() => {
    const fetchData = async () => {
      let {rows: decks} = await Decks.allDocs({include_docs: true});

      // Hoist
      decks = decks.map(d => d.doc);

      setDecks(decks);
    };

    fetchData();
  }, [setDecks]);

  return (
    <View style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        onChangeText={console.log}
      />

      <FlatList
        data={decks}
        style={styles.flatlist}
        renderItem={({item}) =>
          (<Item name={item._id} onPress={() => navigation.navigate('Deck-Details', item)}/>
          )}
        keyExtractor={item => item._id}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingTop: 10
  },
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }, row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  rowContent: {
    fontSize: 24
  }
});
export default DecksScene;
