# Changelog

## version 0.4.6
- add onWsOpen(url, webSocket) option

## version 0.4.5
- check if JSON.parse errors

## version 0.4.4
- resolveDns is now async

## version 0.4.3
- add resolveDns option to use custom DNS resolution.
- improve GET /json/list error handling.

## version 0.4.2

- add a dirty debug for prod test

## version 0.4.1

- fix dnt conversion
- append tailling / in chrome devtools url

## version 0.4.0

- deno version
- add `getHeaders(url: string) => HeadersInit | undefined` option
- `waitForAllEvents` promise implement a
  `getMissing: () => ProtocolEventsName[]` to identify missing event.

## version 0.3.4

- add `alterUrl(url: string) => string` option

## version 0.3.3

- initial version
