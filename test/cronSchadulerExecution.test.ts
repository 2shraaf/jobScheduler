import CronScheduler from '../src/cronScheduler';

jest.useFakeTimers();

beforeEach(() => {
  return jest.clearAllTimers();
});

describe('test execution of jobs according to schedules', () => {
  it('Job must execute after passing the gavin time interval', () => {
    const cronScheduler = new CronScheduler();
    const jobId = cronScheduler.add({
      name: 'test',
      expectedExecutionTimeInSeconds: 11,
      handler: async () => true,
      schedulingInterval: [1, 0, 0, 0, 0, 0],
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(setTimeout).toHaveBeenCalledTimes(2);

    cronScheduler.clearAll();
    jest.clearAllTimers();
  });
});
