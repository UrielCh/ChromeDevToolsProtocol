# cdp-reverter

Generate Chrome DevTools Protocol Session code form a listen session.

If you are using a hi-absrtraction Chrome automation framworks, and want to understand who it works, this is the project you need.

## Usage

Install the package:

```bash
npm install -g cdp-reverter
```

then use it:

```bash
cdp-reverter --help
Usage: cdp-reverter [options]

Options:
  -h, --dest-host <ip>      host to to connect to (default: "127.0.0.1")
  -s, --source <port>       address to listen for incomming connextion (default: "9223")
  -d, --destination <port>  Address of the Chrome developer port (default: "9222")
  -i, --ignore <event>      Ignore some events names (default: [])
  -p, --prefix <name>       output fule prefix (default: "code")
  --help                    display help for command
```

Start it:

```bash
cdp-reverter --prefix code
You can now connect your automation script to http://127.0.0.1:9223
Any incomming connextion will be foward to http://127.0.0.1:9222
Press any Enter to terminate the session
```

launch you automation script on cdp-reverter socket.

press enter to generate simple low level Chrome DevTools Protocol script.


## Usage Alternatif

- Write you Chrome DevTools project, using exta long pause between each step.
- Then use this proxy to find out event you should wait for instead of static delay.

