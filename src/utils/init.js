import {AllCards} from './db';
import downloadCards from './download-cards';

export default async () => {
  try {
    await AllCards.get('_local/updated-at');
  } catch (_) {
    // Not locally cached yet
    await downloadCards();
  }
};
