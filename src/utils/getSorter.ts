import { SortOrder } from 'mongoose';
import { FlightFilterDto } from 'src/flight/dtos/flight-filter.dto';

import { CarFilterDto } from 'src/tracks/dtos/car-filter.dto';
import { TrailerFilterDto } from 'src/trailers/dtos/trailer-filter.dto';
import { UserFilterDto } from 'src/users/dtos/user-filter.dto';

export const getSorter = (
  dto: CarFilterDto | TrailerFilterDto | UserFilterDto | FlightFilterDto,
): { [key: string]: SortOrder } => {
  if (dto?.field && dto?.order) {
    const order = dto.order === 'ascend' ? 'asc' : 'desc';

    return { [dto.field]: order };
  }
};
