import CronScheduler from '../src/cronScheduler';

describe('test add job', () => {
  it('should return data of created job', () => {
    const cronScheduler = new CronScheduler();
    const jobId = cronScheduler.add({
      name: 'testAdd',
      expectedExecutionTimeInSeconds: 11,
      handler: async () => true,
      schedulingInterval: [6, 0, 0, 0, 0, 0],
    });

    const job = cronScheduler.findJob(jobId);

    expect(job?.id).toBe(jobId);
    expect(cronScheduler.numberOfJobs()).toBe(1);

    cronScheduler.clearAll();
  });

  it("shouldn't create job because of invalid time interval in seconds", () => {
    const cronScheduler = new CronScheduler();

    expect(() =>
      cronScheduler.add({
        name: 'testAdd',
        expectedExecutionTimeInSeconds: 11,
        handler: async () => true,
        schedulingInterval: [70, 0, 0, 0, 0, 0],
      })
    ).toThrow();

    cronScheduler.clearAll();
  });

  it("shouldn't create job because of invalid time interval in minutes", () => {
    const cronScheduler = new CronScheduler();

    expect(() =>
      cronScheduler.add({
        name: 'testAdd',
        expectedExecutionTimeInSeconds: 11,
        handler: async () => true,
        schedulingInterval: [0, 60, 0, 0, 0, 0],
      })
    ).toThrow();

    cronScheduler.clearAll();
  });

  it("shouldn't create job because of invalid time interval in hours", () => {
    const cronScheduler = new CronScheduler();

    expect(() =>
      cronScheduler.add({
        name: 'testAdd',
        expectedExecutionTimeInSeconds: 11,
        handler: async () => true,
        schedulingInterval: [0, 0, 24, 0, 0, 0],
      })
    ).toThrow();

    cronScheduler.clearAll();
  });

  it("shouldn't create job because of invalid time interval in days", () => {
    const cronScheduler = new CronScheduler();

    expect(() =>
      cronScheduler.add({
        name: 'testAdd',
        expectedExecutionTimeInSeconds: 11,
        handler: async () => true,
        schedulingInterval: [0, 0, 0, 30, 0, 0],
      })
    ).toThrow();

    cronScheduler.clearAll();
  });
  it("shouldn't create job because of invalid time interval in months", () => {
    const cronScheduler = new CronScheduler();

    expect(() =>
      cronScheduler.add({
        name: 'testAdd',
        expectedExecutionTimeInSeconds: 11,
        handler: async () => true,
        schedulingInterval: [0, 0, 0, 0, 12, 0],
      })
    ).toThrow();

    cronScheduler.clearAll();
  });
});

describe('test delete job', () => {
  it('should delete job by id', () => {
    const cronScheduler = new CronScheduler();
    const jobId = cronScheduler.add({
      name: 'testAdd',
      expectedExecutionTimeInSeconds: 11,
      handler: async () => true,
      schedulingInterval: [6, 0, 0, 0, 0, 0],
    });
    cronScheduler.delete(jobId);

    expect(cronScheduler.numberOfJobs()).toBe(0);

    cronScheduler.clearAll();
  });
  it("shouldn't delete job with wrong id", () => {
    const cronScheduler = new CronScheduler();

    expect(() => cronScheduler.delete('')).toThrow();

    cronScheduler.clearAll();
  });
});
