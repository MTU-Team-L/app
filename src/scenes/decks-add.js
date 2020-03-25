import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import deckcreate from '../utils/deck-create';

const DeckAdd = () => {
  const [text, setText] = useState('');

  const handleAdd = async () => {
    const deck = await deckcreate(text);
    console.log(deck);
    Toast.show(`${deck.id} added!`, Toast.LONG);
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>

        <Input
          placeholder="Deck Name"
          value={text}
          containerStyle={{flex: 0.8}}
          onChangeText={text => setText(text)}
        />

        <Button
          title="Add"
          onPress={handleAdd}
        />
      </View>
    </SafeAreaView>
  );
};

export default DeckAdd;
