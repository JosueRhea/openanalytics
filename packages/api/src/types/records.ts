export enum TIME_RANGE {
  SINCE_YESTERDAY = "1",
  SINCE_7_DAYS = "6 days",
  SINCE_30_DAYS = "30 days",
  SINCE_ALL_TIME = "4000 days",
}

export type CommonSelectRecordsArgs = {
  range: TIME_RANGE;
  site_id: string;
};

export type RecordsByCountry =  {
  hits: number;
  country: string;
}

export type RecordByHits = {
  date: string;
  views: number;
}

export type RecordsByHits = {
  records: RecordByHits[],
  totalHits: number
}

export type RecordsBySingleVisitors  = {
  total: number;
}