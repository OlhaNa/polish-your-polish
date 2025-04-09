export const getShuffledArray = <T>(array: T[]) => {
  return array
    .map((item) => ({ item, sortKey: Math.random() }))
    .sort((item1, item2) => item1.sortKey - item2.sortKey)
    .map(({ item }) => item);
};

export const chooseRandomItemExcluding = <T>(array: T[], itemToExclude: T) => {
  const arrayWithoutItemToExclude = array.filter(
    (item) => item !== itemToExclude,
  );
  const randomIndex = Math.floor(
    arrayWithoutItemToExclude.length * Math.random(),
  );
  return arrayWithoutItemToExclude[randomIndex];
};
