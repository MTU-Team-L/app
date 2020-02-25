import seeds from './seed-data.json';

export default class {
  constructor(db) {
    this.db = db;
  }

  allDocs() {
    return Promise.resolve(seeds[this.db]);
  }
}
