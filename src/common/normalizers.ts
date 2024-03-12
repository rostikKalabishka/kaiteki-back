export const NORMALIZERS = {
  startsWith: {
    fields: ['trackNumber', 'trailerNumber', 'fullName', 'email', 'from', 'to'],
    normalize: (value: string) => new RegExp('^' + value),
  },
};
