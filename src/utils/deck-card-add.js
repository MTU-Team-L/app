import {getGlobal, setGlobal} from 'reactn';

export default async (doc, newList) => {
  console.log(doc, newList);

  // Update global state
  setGlobal({decks: [...getGlobal().decks, {name}]});

  return doc;
};
