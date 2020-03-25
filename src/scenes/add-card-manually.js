import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Toast from 'react-native-simple-toast';

import addByName from '../utils/add-by-name';

const AddScene = () => {
  const [text, setText] = useState('');

  const handleAdd = async () => {
    const card = await addByName(text);

    // Reset input
    setText('');

    Toast.show(`${card.id} added!`, Toast.LONG);
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>

        <Input
          placeholder="Card name"
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

export default AddScene;
