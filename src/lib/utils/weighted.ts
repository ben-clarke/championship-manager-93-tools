interface WeightedItem<T> {
  item: T;
  weight: number;
}

export const weightedRandom = <T>(items: WeightedItem<T>[]): T => {
  const totalWeight = items.reduce((sum, current) => sum + current.weight, 0);
  const randomValue = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    cumulativeWeight += item.weight;
    if (randomValue < cumulativeWeight) return item.item;
  }

  // Fallback (should not happen)
  return items[items.length - 1].item;
};
