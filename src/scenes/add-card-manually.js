import React, {useState} from 'react';
import {View, TextInput, Button, SafeAreaView} from 'react-native';

import addByName from '../utils/add-by-name';

const AddScene = () => {
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>

        <TextInput
          style={{height: 40}}
          placeholder="Card name"
          value={text}
          onChangeText={text => setText(text)}
        />

        <Button
          title="Add"
          onPress={() => addByName(text)}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddScene;
