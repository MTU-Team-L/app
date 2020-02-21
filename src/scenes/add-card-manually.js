import React, {useState} from 'react';
import {View, TextInput, Button, SafeAreaView, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';

import addByName from '../utils/add-by-name';

const AddScene = () => {
  const [text, setText] = useState('');

  const handleAdd = async () => {
    const res = await addByName(text);

    Toast.show(`${res.id} added!`, Toast.LONG);
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>

        <TextInput
          style={styles.input}
          placeholder="Card name"
          value={text}
          onChangeText={text => setText(text)}
        />

        <Button
          title="Add"
          style={styles.button}
          onPress={handleAdd}
        />
      </View>
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
  }
});

export default AddScene;
