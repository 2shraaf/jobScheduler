import CronScheduler from './cronScheduler';

const cronScheduler = new CronScheduler();
const testFunction = async () => true;

const jobId = cronScheduler.add({
  name: 'test',
  expectedExecutionTimeInSeconds: 222,
  handler: testFunction,
  schedulingInterval: [6, 0, 0, 0, 0, 0], // execute each 6 seconds
});
