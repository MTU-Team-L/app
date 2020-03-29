import React, {useState} from 'react';
import Lightbox from 'react-native-lightbox';
import {Button, Alert, Dimensions, View, StyleSheet} from 'react-native';
import {Text, Image} from 'react-native-elements';

import {Cards} from '../utils/db';

export default ({route, navigation}) => {
  const card = route.params;
  const actualDimensions = [745, 1040];
  const screenWidth = Dimensions.get('window').width;
  const scalingFactor = screenWidth / actualDimensions[0];
  const computedDimensions = actualDimensions.map(d => d * scalingFactor);

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

  const [lightboxOpened, setLightboxOpened] = useState(false);

  const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      width: screenWidth
    },
    image: {
      width: screenWidth,
      height: lightboxOpened ? computedDimensions[1] : 200
    },
    darkOverlay: {
      position: 'absolute',
      top: 0,
      width: screenWidth,
      height: 200,
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    cardName: {
      position: 'absolute',
      bottom: 0,
      width: screenWidth,
      color: 'white',
      padding: 15
    }
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Lightbox willClose={() => setLightboxOpened(false)} onOpen={() => setLightboxOpened(true)}>
          <Image style={styles.image} source={{uri: lightboxOpened ? card.image_uris.png : card.image_uris.art_crop}}/>
        </Lightbox>
        <View style={styles.darkOverlay} pointerEvents="none"/>
        <Text h3 style={styles.cardName} pointerEvents="none">{card.name}</Text>
      </View>
    </View>
  );
};
