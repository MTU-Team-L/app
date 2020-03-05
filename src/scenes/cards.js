import React from 'react';
import {View, Text, SafeAreaView, Button, FlatList, Alert, StyleSheet} from 'react-native';
import {usePouch} from '../utils/db';
import {SearchBar} from 'react-native-elements';

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
    <View style={styles.row}>
      <Text style={styles.rowContent} onPress={onPress}>{name}</Text>
    </View>
  );

  const [cards] = usePouch('cards');

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

export default CardsScene;
