import React, {useState} from 'react';
import Lightbox from 'react-native-lightbox';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Text, Image} from 'react-native-elements';

export default ({text, previewURI, fullURI, imageDimensions, height = 200}) => {
  const screenWidth = Dimensions.get('window').width;
  const scalingFactor = screenWidth / imageDimensions[0];
  const computedDimensions = imageDimensions.map(d => d * scalingFactor);

  const [lightboxOpened, setLightboxOpened] = useState(false);

  const styles = StyleSheet.create({
    header: {
      width: screenWidth
    },
    image: {
      width: screenWidth,
      height: lightboxOpened ? computedDimensions[1] : height
    },
    darkOverlay: {
      position: 'absolute',
      top: 0,
      width: screenWidth,
      height,
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    text: {
      position: 'absolute',
      bottom: 0,
      width: screenWidth,
      color: 'white',
      padding: 15
    }
  });

  return (
    <View style={styles.header}>
      <Lightbox willClose={() => setLightboxOpened(false)} onOpen={() => setLightboxOpened(true)}>
        <Image style={styles.image} source={{uri: lightboxOpened ? fullURI : previewURI}}/>
      </Lightbox>
      <View style={styles.darkOverlay} pointerEvents="none"/>
      <Text h3 style={styles.text} pointerEvents="none">{text}</Text>
    </View>
  );
};
