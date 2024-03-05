import { SPECIAL_FIELDS } from 'src/common/specialFields';
import { CarFilterDto } from '../dtos/car-filter.dto';

export const normalizeFilters = (rawFilters: CarFilterDto) => {
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
