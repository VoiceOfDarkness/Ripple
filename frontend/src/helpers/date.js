export const getDate = (date = null) => {
  const hours = date ? new Date(date) : new Date();
  const minutes =
    Number(hours.getMinutes()) / 10 <= 1
      ? `0${hours.getMinutes()}`
      : `${hours.getMinutes()}`;

  return `${hours.getHours() + (date ? 4 : 0)}:${minutes}`;
};
