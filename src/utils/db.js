import {useState, useEffect, useRef} from 'react';
import PouchDB from './pouchdb';

export {PouchDB};

export const Cards = new PouchDB('cards');

export const Decks = new PouchDB('decks');

export const usePouch = name => {
  const [docs, setDocs] = useState([]);
  const [findQuery, setFindQuery] = useState({});

  const docsRef = useRef(null);

  // Must use ref for updating: https://stackoverflow.com/a/55156813/12638523
  useEffect(() => {
    docsRef.current = docs;
  }, [docs]);

  const updateDocs = ({doc, deleted}) => {
    const currentDocs = docsRef.current;

    if (deleted) {
      setDocs(currentDocs.filter(d => d._id !== doc._id));
    } else {
      const docExists = currentDocs.filter(d => d._id === doc._id).length === 1;

      if (docExists) {
        setDocs(currentDocs.map(d => d._id === doc._id ? doc : d));
      } else {
        setDocs([...currentDocs, doc]);
      }
    }
  };

  // Wrap in useEffect so we can remove event listener on unmount
  useEffect(() => {
    const db = new PouchDB(name);

    // Load docs for first time
    if (Object.keys(findQuery).length === 0) {
      db.allDocs({include_docs: true}).then(({rows}) => {
      // Hoist
        setDocs(rows.map(r => r.doc));
      });
    } else {
      db.find(findQuery).then(({docs}) => {
      // Hoist
        setDocs(docs);
      });
    }

    const changes = db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', updateDocs);

    return () => {
      changes.cancel();
      db.close();
    };
  }, [name, findQuery]);

  return [docs, setFindQuery];
};
