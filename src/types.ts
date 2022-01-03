export interface Config {
  [key: string]: string;
}

export interface RecordSearchParams {
  minCount: number;
  maxCount: number;
  startDate: Date;
  endDate: Date;
}
