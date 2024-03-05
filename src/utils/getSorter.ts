import { SortOrder } from 'mongoose';
import { CarFilterDto } from 'src/tracks/dtos/car-filter.dto';

export const getSorter = (dto: CarFilterDto): { [key: string]: SortOrder } => {
  if (dto?.field && dto?.order) {
    const order = dto.order === 'ascend' ? 'asc' : 'desc';

    return { [dto.field]: order };
  }
};
