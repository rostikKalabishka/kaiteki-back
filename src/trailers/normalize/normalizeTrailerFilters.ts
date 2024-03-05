import { SPECIAL_FIELDS } from 'src/common/specialFields';
import { TrailerFilterDto } from '../dtos/trailer-filter.dto';

export const normalizeTrailerFilters = (rawFilters: TrailerFilterDto) => {
  return Object.fromEntries(
    Object.entries(rawFilters).map(([key, value]) => {
      let newValue = value;
      const { fields, normalizer } = SPECIAL_FIELDS.startsWith;
      if (fields.includes(key)) {
        newValue = normalizer(value);
      }
      return [key, newValue];
    }),
  );
};
