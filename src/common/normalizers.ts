export const NORMALIZERS = {
  startsWith: {
    fields: ['trackNumber', 'trailerNumber', 'fullName', 'email'],
    normalize: (value: string) => new RegExp('^' + value),
  },
};
