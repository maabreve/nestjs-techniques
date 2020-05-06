/*
This enum just makes it easy to set cache ttls. Type cacheable uses
seconds.
*/
export enum CacheTtlSeconds {
  ONE_MINUTE = 60,
  ONE_HOUR = 60 * 60,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 7 * 24 * 60 * 60,
}