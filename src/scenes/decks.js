import {SearchBar} from 'react-native-elements';
import React from 'react';
import {View, Text, Button, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {usePouch} from '../utils/db';

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

  const [decks] = usePouch('decks');

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        onChangeText={console.log}
      />

      <FlatList
        data={decks}
        style={styles.flatlist}
        renderItem={({item}) =>
          (<Item name={item._id} onPress={() => navigation.navigate('Deck-Manage', item._id)}/>
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
export default DecksScene;
