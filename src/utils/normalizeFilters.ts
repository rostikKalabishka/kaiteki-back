import { CarFilterDto } from '../tracks/dtos/car-filter.dto';
import { TrailerFilterDto } from 'src/trailers/dtos/trailer-filter.dto';
import { SYSTEM_FIELDS, NORMALIZERS } from 'src/common';

export const normalizeFilters = (
  rawFilters: CarFilterDto | TrailerFilterDto,
) => {
  return Object.fromEntries(
    Object.entries(rawFilters)
      .map(([key, value]) => {
        let newValue = value;

        Object.entries(NORMALIZERS).map(([, normalizer]) => {
          const { fields, normalize } = normalizer;
          if (fields.includes(key)) {
            newValue = normalize(value);
          }
        });

        return [key, newValue];
      })
      .filter(([key]) => !SYSTEM_FIELDS.includes(key)),
  );
};
