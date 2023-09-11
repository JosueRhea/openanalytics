import { TIME_RANGE } from "./records";

export type CommonSiteGetArgs = {
  site_id: string;
};

export type GetSiteStatsArgs = {
    site_id: string;
    range: TIME_RANGE
}
