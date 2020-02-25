// eslint-disable-next-line import/default
import SearchBar from 'react-native-search-bar';
import React from 'react';
import {SafeAreaView} from 'react-native';

const DeckManageScene = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        onChangeText={console.log}
      />
    </SafeAreaView>
  );
};

export default DeckManageScene;
