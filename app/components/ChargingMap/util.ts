import dayjs from 'dayjs';

export const isCurrentTime = (start: string, end: string) => {
  const currentTime = dayjs();
  const startTime = dayjs(currentTime.format('YYYY-MM-DD') + ' ' + start, 'HH:mm');
  const endTime = dayjs(currentTime.format('YYYY-MM-DD') + ' ' + end, 'HH:mm');
  console.log(startTime.toISOString(), endTime.toISOString(), currentTime.toISOString());
  return currentTime.isAfter(startTime) && currentTime.isBefore(endTime);
};
