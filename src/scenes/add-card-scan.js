import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import {Cards} from '../utils/db';
import * as Scry from 'scryfall-sdk';
import roundTo from '../utils/round-to';

const MIN_LEN = 3;
const MAX_LEN = 40;

export default ({navigation}) => {
  const [lastAdd, setLastAdd] = useState(null);
  const [alertText, setAlertText] = useState('');

  const showAlert = text => {
    setAlertText(text);

    setTimeout(() => {
      setAlertText('');
    }, 2000);
  };

  const onTextRecognized = async ({textBlocks}) => {
    if (textBlocks.length === 0) {
      return;
    }

    // Transform
    const blocks = textBlocks.map(b => ({value: b.value, x: roundTo(b.bounds.origin.x, 50), y: roundTo(b.bounds.origin.y, 50)}));

    // Sort by height
    const sorted = blocks.sort((a, b) => a.y - b.y);

    const minY = sorted[0].y;

    // Get top blocks, sort by x position
    const topBlocks = sorted.filter(b => b.y === minY).sort((a, b) => a.x - b.x);

    const topLeftBlock = topBlocks[0];
    const string = topLeftBlock.value;

    if (MIN_LEN <= string.length && string.length <= MAX_LEN) {
      // Search for card
      const cards = await Scry.Cards.search(`"${string}" lang:en`).waitForAll();

      if (cards.length > 2 || cards.length === 0) {
        return;
      }

      const card = cards[0];

      try {
        await Cards.get(card.id);

        if (!lastAdd || lastAdd._id !== card.id) {
          showAlert('Ignoring duplicate');
        }
      } catch (_) {
        card._id = card.id;
        delete card.id;

        const doc = await Cards.put(card);
        setLastAdd({_id: card.id, _rev: doc.rev, ...card});
      }
    }
  };

  const undoLastAdd = async () => {
    await Cards.remove(lastAdd);

    showAlert('Removed card');

    setLastAdd(null);
  };

  // Start card placeholder animation
  const interpolatedBorderColor = new Animated.Value(1);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(interpolatedBorderColor, {
          duration: 2000,
          toValue: 7
        })
      ])).start();
  });

  const borderColor = interpolatedBorderColor.interpolate({
    inputRange: [1, 2, 3, 4, 5, 6, 7],
    outputRange: ['#00ff0d', '#00f2ff', '#0051ff', '#70f', '#f0b', '#ff0015', '#ffea00']
  });

  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
        onCameraReady={() => console.log('camera ready')}
        onTextRecognized={navigation.isFocused() ? onTextRecognized : null}
      />

      <AnimatedView style={{...styles.cardPlaceholder, borderColor}}>
        <AnimatedView style={{...styles.innerCardPlaceholder, borderColor}}/>
      </AnimatedView>

      <View style={styles.spacer}/>

      {
        alertText === '' ? (
          <View/>
        ) : (
          <View style={styles.alert}>
            <Text>{alertText}</Text>
          </View>
        )
      }
      {
        lastAdd ? (
          <View style={styles.cardAdded}>
            <Text>Added <Text style={{fontWeight: 'bold'}}>{lastAdd.name}</Text></Text>
            <Button title="Undo" onPress={undoLastAdd}/>
          </View>
        ) : (<View/>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardPlaceholder: {
    position: 'absolute',
    width: 224,
    height: 324,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'black',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  innerCardPlaceholder: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    height: 30,
    width: 200,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'black'
  },
  preview: {
    position: 'absolute',
    height: '100%',
    width: '100%'

  },
  spacer: {
    flex: 1
  },
  alert: {
    flex: 0,
    width: '50%',
    backgroundColor: 'white',
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  cardAdded: {
    flex: 0,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  }
});
