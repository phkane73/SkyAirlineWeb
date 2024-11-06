export function millisecondsToHoursAndMinutes(milliseconds) {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

export function hoursAndMinutesToMilliseconds(hours, minutes) {
  const milliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  return milliseconds;
}
