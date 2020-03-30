import React from 'react';
import {Button, Alert, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Cards} from '../utils/db';
import ImageHeader from '../components/image-header';
import ManaBadge from '../components/mana-badge';

export default ({route, navigation}) => {
  const card = route.params;

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Delete" onPress={() => Alert.alert('Really remove this card?', '(Confirm Removal)', [
          {text: 'Yes, Remove Card', onPress: async () => {
            await Cards.remove(card);
            navigation.navigate('Cards');
          }},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ])}/>
    ),
    headerTransparent: true,
    headerTintColor: 'white'
  });

  return (
    <View style={{flex: 1}}>
      <ImageHeader text={card.name} previewURI={card.image_uris.art_crop} fullURI={card.image_uris.png} imageDimensions={[745, 1040]}/>

      {card.colors.map(c => <ManaBadge key={c} color={c}/>)}

      <Text style={{margin: 15, marginTop: 0}}>{card.oracle_text}</Text>
    </View>
  );
};
