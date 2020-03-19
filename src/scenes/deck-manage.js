import {SearchBar} from 'react-native-elements';
import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {Cards} from '../utils/db';
import {useGlobal} from 'reactn';

const DeckManageScene = ({navigation}) => {
  /* Const handleAdd = async () => {
    const res = await deckcreate(text);
    console.log(res);
    Toast.show(`${res.id} added!`, Toast.LONG);
  }; */

  // Row for list view
  const Item = ({name, onPress}) => (
    <View style={styles.row}>
      <Text style={styles.rowContent} onPress={onPress}>{name}</Text>
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
      <SearchBar
        placeholder="Search"
        onChangeText={console.log}
      />
      <FlatList
        data={cards}
        style={styles.flatlist}
        renderItem={({item}) => (
          <Item name={item.name} onPress={() => navigation.navigate('Card-Details', item)}/>
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontSize: 24,
    height: 40,
    width: 250
  },
  button: {
    backgroundColor: 'blue',
    color: 'black',
    borderRadius: 10
  },
  flatlist: {
    paddingTop: 10
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  rowContent: {
    fontSize: 24
  }
});

export default DeckManageScene;
