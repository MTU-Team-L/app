import React from 'react';
import {Image, SafeAreaView} from 'react-native';

export default ({route}) => {
  const card = route.params;

  const actualDimensions = [480, 680];
  const scalingFactor = 0.8;
  const computedDimensions = actualDimensions.map(d => d * scalingFactor);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{width: computedDimensions[0], height: computedDimensions[1]}} source={{uri: card.image_uris.border_crop}}/>
    </SafeAreaView>
  );
};
