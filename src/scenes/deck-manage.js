// eslint-disable-next-line import/default
import SearchBar from 'react-native-search-bar';
import React, { useEffect } from 'react';
import { useGlobal } from 'reactn';
import { View, Text, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Decks } from '../utils/db';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

const DeckManageScene = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar
                placeholder="Search"
                onChangeText={console.log}
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
export default DeckManageScene;