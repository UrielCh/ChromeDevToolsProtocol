# changelog

## v0.1.2 (2022-11-24)
- drop link headers from cached pages.

## v0.1.1 (2022-10-12)
- fix CacheManager type usage.

## v0.1.0 (2022-10-12)
* CacheManager is now an interface the old implementation is now named CacheManagerRedisLongTerm
* add CacheManagerRedisTTL this implementation will expire data after 3 days by default

## v0.0.4 (2022-07-28)
* ChromeRemoteCache.getStats() return CacheStat objects
* improve CacheStat
* handle empty body
* add ChromeRemoteCache.cacheIgnore
* change debug colors
* add ChromeRemoteCache.efficency

## v0.0.3 (2022-07-28)
* do not permit duplicate entry in urlSet
* add del method in urlSet
* add extrac counter in urlSet
* enable ava + add tests for urlSet

## v0.0.2 (2022-07-28)
* add methods to ChromeRemoteCache
* add dropQueryParam, formatSize exports

## v0.0.1 (2022-07-28)
* initial release