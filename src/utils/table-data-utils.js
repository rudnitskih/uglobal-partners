export const getDateOfJoin = (university) => {
  const rowDate = university['Date of joining'];
  const [day, month, year] = rowDate?.split('.');
  return new Date(year, month - 1, day);
}