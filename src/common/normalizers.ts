export const NORMALIZERS = {
  startsWith: {
    fields: ['trackNumber', 'trailerNumber'],
    normalize: (value: string) => {
      new RegExp('^' + value);
    },
  },
};
