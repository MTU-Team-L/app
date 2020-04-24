import React, {Component} from 'react';
import {SearchBar, ListItem, Card} from 'react-native-elements';
import {Button, SafeAreaView, FlatList, Alert} from 'react-native';
import {usePouch, Decks} from '../utils/db';
import Swipeout from 'react-native-swipeout';

// Deck View Scence
class Item extends Component {
  render() {
    const swipe = {
      autoClose: true,
      onClose: () => {
        if (this.state.activeRowKey !== null) {
          this.setState({activeRowKey: null});
        }
      },
      onOpen: () => {
        this.setState({activeRowKey: this.props.item._id});
      },
      right: [
        {
          onPress: () => {
            Alert.alert(
              'Alert',
              'Are you sure you want to delete?',
              [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                  text: 'Yes', onPress: () => {
                    const t = [...this.props.route.params.cardList];
                    t.splice(this.props.index, 1);
                    const doc = {
                      _id: this.props.route.params._id,
                      _rev: this.props.route.params._rev,
                      cardList: t

                    };
                    Decks.put(doc);
                    // Console.log("doc", Decks);
                  }
                }
              ],
              {cancelable: true}
            );
          },
          text: 'delete', type: 'delete'
        }
      ],

      rowId: this.props.index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipe}>

        <ListItem
          bottomDivider chevron title={this.props.item.name}

          onPress={() => this.props.navigation.navigate('Card-Details', this.props.item)}
        />

      </Swipeout>
    );
  }
}
const DecksScene = ({route, navigation}) => {
  navigation.setOptions({
    headerRight: () => (

      <Button
        title="Manage" onPress={() => Alert.alert('What would you like to do?', '', [
          {
            text: 'Add a card', onPress: async () => {
              navigation.navigate('Deck-Manage', route.params, navigation);
            }
          },
          {
            text: 'Delete this deck', onPress: async () => {
              await Decks.remove(route.params);
              navigation.navigate('Decks');
            }
          },
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}

        ])}/>
    )

  });
  const [decks] = usePouch('decks');
  const thisCard = decks.filter(d => d._id === route.params._id);
  let s;
  try {
    s = thisCard[0].cardList;
  } catch {
    s = thisCard.cardList;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search"
        onChangeText={console.log}
      />

      <FlatList
        data={s}

        renderItem={({item, index}) => {
          return (
            <Item item={item} index={index} route={route} navigation={navigation}/>
          );
        }}

        keyExtractor={item => item._id}

      />
    </SafeAreaView>

  );
};

Item.propsTypes = {
  item: Card,
  index: String
};
Item.defaultProps = {
  item: null,
  index: null
};
export default DecksScene;
