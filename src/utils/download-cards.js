import {PouchDB} from './db';

const N_FILES = 20;

export default async () => {
  // Delete all documents
  await new PouchDB('all-cards').destroy();

  const newDB = new PouchDB('all-cards');

  // Create index on name
  await newDB.createIndex({
    index: {
      fields: ['name']
    }
  });

  // TODO: get URL programmatically
  const url = 'https://raw.githubusercontent.com/MTU-Team-L/data/master/out';

  const files = [];

  for (let i = 0; i <= N_FILES; i++) {
    files.push(`${url}/${i}.json`);
  }

  await Promise.all(files.map(async file => {
    const res = await (await fetch(file)).json();

    // Add IDs
    const docs = res.map(r => {
      r._id = r.id;
      delete r.id;

      return r;
    });

    await newDB.bulkDocs(docs);
  }));

  await newDB.put({_id: '_local/updated-at', timestamp: new Date()});
};
