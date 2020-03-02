import 'react-native-gesture-handler';
import React from 'react';
import {setGlobal} from 'reactn';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CardsScene from './scenes/cards';
import CardDetails from './scenes/card-details';
import AddCardManually from './scenes/add-card-manually';
import AddCardScan from './scenes/add-card-scan';
import DecksScene from './scenes/decks';
import DeckAdd from './scenes/decks-add';
import DeckManage from './scenes/deck-manage';

// Set global state variables
setGlobal({
  cards: [],
  decks: []
});

const Tab = createBottomTabNavigator();
const CardsStack = createStackNavigator();
const DecksStack = createStackNavigator();

const CardsStackScreen = () => (
  <CardsStack.Navigator>
    <CardsStack.Screen name="Cards" component={CardsScene}/>
    <CardsStack.Screen name="Card-Details" component={CardDetails} options={({route}) => ({title: route.params.name})}/>
    <CardsStack.Screen name="Add-Card-Manually" component={AddCardManually} options={{title: 'Add a Card'}}/>
    <CardsStack.Screen name="Add-Card-Scan" component={AddCardScan} options={{title: 'Add a Card'}}/>

  </CardsStack.Navigator>
);

const DecksStackScreen = () => (
  <DecksStack.Navigator>
    <DecksStack.Screen name="Decks" component={DecksScene}/>
    <DecksStack.Screen name="Deck-Add" component={DeckAdd} options={{title: 'Create a Deck'}}/>
    <DecksStack.Screen name="Deck-Manage" component={DeckManage} options={{title: 'Add a Card to a Deck'}}/>
  </DecksStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Cards" component={CardsStackScreen}/>
      <Tab.Screen name="Decks" component={DecksStackScreen}/>
    </Tab.Navigator>
  </NavigationContainer>
);
