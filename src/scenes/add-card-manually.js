import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import * as Scry from 'scryfall-sdk';

import addByName from '../utils/add-by-name';

const AddScene = () => {
  const [text, setText] = useState('');
  const [cards, setCards] = useState([]);
  const searchInput = useRef(null);

  const handleAdd = async cardName => {
    try {
      const card = await addByName(cardName);

      // Reset input
      setText('');
      setCards([]);

      Toast.show(`${card.id} added!`, Toast.LONG);

      searchInput.current.focus();
    } catch (_) {
      Toast.show('Card already exists!', Toast.LONG);
    }
  };

  const handleSearchInput = async t => {
    setText(t);

    const suggestions = await Scry.Cards.autoCompleteName(t);

    setCards(suggestions);
  };

  // Focus search on load
  useEffect(() => {
    searchInput.current.focus();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        ref={s => {
          searchInput.current = s;
        }} placeholder="Card name…" value={text}
        onChangeText={handleSearchInput}/>

      <FlatList
        data={cards}
        renderItem={({item}) => (
          <ListItem bottomDivider chevron title={item} onPress={() => handleAdd(item)}/>
        )}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

export default AddScene;
