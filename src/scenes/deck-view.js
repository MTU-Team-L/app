import React from 'react';
import {SearchBar, ListItem} from 'react-native-elements';
import {Button, SafeAreaView, FlatList} from 'react-native';

// Deck View Scence
const DecksScene = ({route, navigation}) => {
  const t = route.params.cardList;
  console.log(t);
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Add" onPress={() => navigation.navigate('Deck-Manage', route.params)}

      />
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
