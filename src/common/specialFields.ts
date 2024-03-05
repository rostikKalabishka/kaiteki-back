export const SPECIAL_FIELDS = {
  startsWith: {
    fields: ['trackNumber', 'trailerNumber'],
    normalizer: (value: string) => new RegExp('^' + value),
  },
};
