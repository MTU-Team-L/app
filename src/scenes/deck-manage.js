import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';
import {View, Text, Button, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {Decks} from '../utils/db';
// Deck View Scence
const DecksManage = ({navigation, route}) => {
  const deckId = route.params;
  const array = [];
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Add" onPress={() => navigation.navigate('Deck-Card-Add')}

      />
    )
  });

  // Row for list view
  const Item = ({name, onPress}) => (
    <View style={styles.row}>
      <Text style={styles.rowContent} onPress={onPress}>{name}</Text>
    </View>
  );
  const [setDecks] = useGlobal('decks');
  console.log(Decks.get(deckId));

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
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={array}
        style={styles.flatlist}
        renderItem={({array}) =>
          (<Item name={array} onPress={() => navigation.navigate('Deck-Manage', array)}/>
          )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>

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
export default DecksManage;
