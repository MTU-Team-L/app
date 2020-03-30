const COLOR_MAP = {W: 'white', U: 'blue', B: 'black', R: 'red', G: 'green'};

export default string => {
  const colors = [];

  for (const c of string) {
    colors.push(COLOR_MAP[c]);
  }

  return colors;
};
