import PouchDB from '@craftzdog/pouchdb-core-react-native';
import mapreduce from 'pouchdb-mapreduce';

import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import PouchDBFind from 'pouchdb-find';

// eslint-disable-next-line new-cap
const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

export default PouchDB
  .plugin(mapreduce)
  .plugin(SQLiteAdapter)
  .plugin(PouchDBFind);
