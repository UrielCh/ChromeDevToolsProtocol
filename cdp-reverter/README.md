# cdp-reverter

Generate Chrome DevTools Protocol Session code from a listen-to session.

If you use a hi-abstraction Chrome automation framework and want to understand how it works, this is the project you need.

## Usage

### Setup
Install the package:
```bash
npm install -g cdp-reverter
```
or using npx
```bash
npx cdp-reverter
```

### Help

then use it:

```bash
npx cdp-reverter --help
Usage: cdp-reverter [options]

Options:
  -h, --dest-host <ip>      host to to connect to (default: "127.0.0.1")
  -s, --source <port>       address to listen for incoming connections (default: "9223")
  -d, --destination <port>  Address of the Chrome developer port (default: "9222")
  -i, --ignore <event>      Ignore some events names (default: [])
  -p, --prefix <name>       output fule prefix (default: "code")
  --help                    display help for command
```

### use it

Start it:

```bash
cdp-reverter --prefix code
You can now connect your automation script to http://127.0.0.1:9223
Any incoming connection will be forward to http://127.0.0.1:9222
Press any Enter to terminate the session
```

Launch your automation script on the cdp-reverter socket.

Press enter to generate a simple low-level Chrome DevTools Protocol script.

or with npx
```bash
npx cdp-reverter -s 9555 -d 9222 -p mysession
```

## Usage Alternatif

- Write your Chrome DevTools project, using extra long pauses between each step.
- Then, use this proxy to find out the event you should wait for instead of static delay.

## know issues

Once generated, you may need to re-order and wait for event lines.
This generator cannot predict event timing by listening only to the Chrome DevTools Protocol Session.