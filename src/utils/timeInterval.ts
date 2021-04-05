import { ITimeInterval } from '../interfaces/ICronScheduler';

const timeIntervalReference = [
  { name: 'seconds', value: 60 },
  { name: 'minuets', value: 60 },
  { name: 'hours', value: 24 },
  { name: 'days', value: 30 },
  { name: 'months', value: 12 },
  { name: 'years', value: 1000 },
];

export const validateTimeIntervale = (timeInterval: ITimeInterval) => {
  for (let i = 0; i < timeInterval.length; i++) {
    const validInterval = timeIntervalReference[i].value,
      timeValue = timeInterval[i];
    if (timeValue >= validInterval || timeValue < 0)
      throw new Error(
        `Invalid time interval, ${timeIntervalReference[i].name} is not in range`
      );
  }
};

export const getTimeIntervalInMilliseconds = (
  timeInterval: ITimeInterval
): number => {
  let multiplier = 1000;
  let timeInMilliseconds = 0;
  for (let i = 0; i < timeInterval.length; i++) {
    timeInMilliseconds += timeInterval[i] * multiplier;
    multiplier *= timeIntervalReference[i].value;
  }
  return timeInMilliseconds;
};
