import {useState, useEffect} from 'react';
import PouchDB from 'pouchdb-react-native';

export const Cards = new PouchDB('cards');

export const Decks = new PouchDB('decks');

export const usePouch = name => {
  const [docs, setDocs] = useState([]);

  const db = new PouchDB(name);

  // Load docs first time
  useEffect(() => {
    (async () => {
      const {rows} = await db.allDocs({include_docs: true});

      // Hoist
      const d = rows.map(r => r.doc);

      setDocs(d);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  db.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).on('change', ({doc, deleted}) => {
    if (deleted) {
      setDocs(docs.filter(d => d._id !== doc._id));
    } else {
      const docExists = docs.filter(d => d._id === doc._id).length === 1;

      if (docExists) {
        setDocs(docs.map(d => d._id === doc._id ? doc : d));
      } else {
        setDocs([...docs, doc]);
      }
    }
  });

  return [docs];
};
