export interface ICronScheduler {
  add(jobDTO: IJobDTO): string;
  delete(jobId: string): void;
  execute(jobId: string): void;
  findJob(jobId: string): IJobOTD | null;
  clearAll(): void;
  numberOfJobs(): number;
}
/**
 *  Seconds, minuets, hours, days, months, years.
 */
export type ITimeInterval = [number, number, number, number, number, number];

export interface IJob {
  id: string;
  name: string;
  handler: () => Promise<boolean>;
  expectedExecutionTimeInSeconds: number;
  lastExecutionDurationInMilliseconds?: number;
  schedulingInterval: ITimeInterval;
  createdDate: Date;
  timeOut: NodeJS.Timeout;
}

export interface IJobDTO {
  name: string;
  handler: () => Promise<boolean>;
  expectedExecutionTimeInSeconds: number;
  schedulingInterval: ITimeInterval;
}

export interface IJobOTD {
  id: string;
  name: string;
  expectedExecutionTimeInSeconds: number;
  lastExecutionDurationInMilliseconds?: number;
  schedulingInterval: ITimeInterval;
  createdDate: Date;
}
