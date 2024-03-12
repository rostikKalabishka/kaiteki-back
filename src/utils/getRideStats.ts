import { Flight } from 'src/flight/schemas/flight.schemas';

const FUEL_COST = 47;

export const getRideStats = (flight: Flight) => {
  const {
    distance,
    driver: { salaryPerOneKm },
    track: { fuelCosts },
  } = flight;

  const fuelPrice = distance * 0.01 * fuelCosts * FUEL_COST;
  const driverPrice = distance * salaryPerOneKm;

  return { fuelPrice, driverPrice, total: fuelPrice + driverPrice };
};
