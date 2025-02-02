import { parse, isWithinInterval, set } from 'date-fns';

export function isCurrentTime(startTime: string, endTime: string): boolean {
  const now = new Date();

  const parseTime = (timeString: string) => {
    const [hours, minutes] = parse(timeString, 'HH:mm', new Date()).toTimeString().split(':');
    return set(now, {
      hours: Number.parseInt(hours, 10),
      minutes: Number.parseInt(minutes, 10),
      seconds: 0,
      milliseconds: 0,
    });
  };

  const start = parseTime(startTime);
  const end = parseTime(endTime);

  // Handle cases where the end time is on the next day
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }

  return isWithinInterval(now, { start, end });
}
