export const sanitizeCar = (carFilterDto: any) => {
  const sanitizedUser = carFilterDto;
  delete sanitizedUser.field;
  delete sanitizedUser.order;

  return sanitizedUser;
};
