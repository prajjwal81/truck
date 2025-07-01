export const parseDate = dateString => {
  const [day, month, year] = dateString.split('/');
  const dateObj = new Date(`${year}-${month}-${day}`);

  const fullMonth = dateObj.toLocaleDateString('en-US', {month: 'long'});
  const shortMonth = fullMonth.substring(0, 3).toUpperCase();

  return {
    day,
    month: shortMonth,
    year,
  };
};
