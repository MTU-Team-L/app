import React from 'react';
import {Image, SafeAreaView, Button, Alert} from 'react-native';

import {Cards} from '../utils/db';
import {useGlobal} from 'reactn';

export default ({route, navigation}) => {
  const card = route.params;
  const actualDimensions = [480, 680];
  const scalingFactor = 0.8;
  const computedDimensions = actualDimensions.map(d => d * scalingFactor);
  const [cards, setCards] = useGlobal('cards');

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Delete" onPress={() => Alert.alert('Really remove this card?', '(Confirm Removal)', [
          {text: 'Yes, Remove Card', onPress: async () => {
            await Cards.remove(card);
            setCards(cards.filter(c => card._id !== c._id));
            navigation.navigate('Cards');
          }},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ])}/>
    )
  });

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{width: computedDimensions[0], height: computedDimensions[1]}} source={{uri: card.image_uris.border_crop}}/>
    </SafeAreaView>
  );
};
