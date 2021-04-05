import {
  ICronScheduler,
  IJobDTO,
  IJob,
  IJobOTD,
} from './interfaces/ICronScheduler';
import { nanoid } from 'nanoid';
import {
  getTimeIntervalInMilliseconds,
  validateTimeIntervale,
} from './utils/timeInterval';
import logger from './loaders/logger';

export default class CronScheduler implements ICronScheduler {
  private jobs: IJob[];
  private createdDate: Date;

  /**
   * Cron Scheduler Keep track of running jobs in array,
   * and keep executing them according to scheduling time interval using "setTimeout",
   * A timer Nodejs function
   */
  constructor() {
    this.jobs = [];
    this.createdDate = new Date();
    logger.info(`Created a new Cron Scheduler in ${this.createdDate}`);
  }

  /**
   * Add new job in Cron Scheduler
   * @param job
   */
  public add(jobDTO: IJobDTO): string {
    CronScheduler.validateJob(jobDTO);
    const id = nanoid();
    const createdDate = new Date();
    const timeOut = setTimeout(
      async () => this.execute(id),
      getTimeIntervalInMilliseconds(jobDTO.schedulingInterval)
    );

    const job: IJob = {
      id,
      createdDate,
      timeOut,
      ...jobDTO,
    };

    this.jobs.push(job);

    logger.info(
      `Add a new Job with name: ${job.name},
        id: ${job.id}, expectedTime:  ${job.expectedExecutionTimeInSeconds}, 
        frequency: ${job.schedulingInterval}, createdDate: ${job.createdDate}`
    );

    return job.id;
  }

  /**
   * Delete A job from Cron Scheduler and clears its timer
   * @param jobId
   */
  public delete(jobId: string): void {
    const job = this.jobs.find((value) => value.id == jobId);
    if (job) {
      clearTimeout(job.timeOut);
      this.jobs = this.jobs.filter((value) => value.id != jobId);

      logger.info(
        `Delete a Job with name: ${job.name},
          id: ${job.id}`
      );
    } else {
      throw new Error(`No jobs with id:${jobId}`);
    }
  }

  /**
   * Executing a job according to its schedule
   * @param jobId
   */

  public async execute(jobId: string): Promise<Boolean> {
    const job = this.jobs.find((value) => value.id == jobId);
    if (job) {
      const startExecution = new Date();

      logger.info(
        `Start executing a Job with name: ${job.name},
          id: ${job.id}, at: ${startExecution}`
      );

      try {
        job.timeOut = setTimeout(
          async () => this.execute(job.id),
          getTimeIntervalInMilliseconds(job.schedulingInterval)
        );
        await job.handler();
        const endExecution = new Date();
        const duration = endExecution.getTime() - startExecution.getTime();
        job.lastExecutionDurationInMilliseconds = duration;
        logger.info(
          `End executing a Job with name: ${job.name},
            id: ${job.id}, at: ${endExecution},
             takes: ${duration} Milliseconds`
        );
      } catch (error) {
        logger.error(error);
        return false;
      }
      return true;
    } else {
      logger.error(`No jobs with id: ${jobId}`);
      throw new Error(`No jobs with id:${jobId}`);
    }
  }

  /**
   * Return a job by id if it found, otherwise return null
   * @param jobId
   */
  public findJob(jobId: string): IJobOTD | null {
    const job = this.jobs.find((value) => value.id == jobId);
    if (job) {
      return CronScheduler.getJobOTD(job);
    } else return null;
  }

  public numberOfJobs(): number {
    return this.jobs.length;
  }

  public clearAll() {
    this.jobs.map((job) => clearTimeout(job.timeOut));
    this.jobs = [];
    return true;
  }

  private static getJobOTD(job: IJob): IJobOTD {
    return {
      id: job.id,
      name: job.name,
      expectedExecutionTimeInSeconds: job.expectedExecutionTimeInSeconds,
      lastExecutionDurationInMilliseconds:
        job.lastExecutionDurationInMilliseconds,
      createdDate: job.createdDate,
      schedulingInterval: job.schedulingInterval,
    };
  }

  private static validateJob(job: IJobDTO): boolean {
    validateTimeIntervale(job.schedulingInterval);
    return true;
  }
}
