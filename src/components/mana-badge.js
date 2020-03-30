import React from 'react';
import {View} from 'react-native';

import B from '../assets/mana-symbols/B.svg';
import G from '../assets/mana-symbols/G.svg';
import R from '../assets/mana-symbols/R.svg';
import U from '../assets/mana-symbols/U.svg';
import W from '../assets/mana-symbols/W.svg';

const SYMBOLS = {B, G, R, U, W};

export default ({color}) => {
  const Symbol = SYMBOLS[color];

  return (
    <View style={{margin: 15}}>
      <Symbol width={30} height={30}/>
    </View>
  );
};
