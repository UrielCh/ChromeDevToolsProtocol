let id = 0;
export const sampleUrl = () =>
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png?ts=" + id++; // chrome://newtab/
import { Devtools } from "../lib/Devtools";
const url = "http://127.0.0.1:9222";
// const url = "http://127.0.0.1:9555";
export const devTools = new Devtools({ url, timeout: 1500 });

// if ! curl -s 'http://localhost:9222' >/dev/null; then
//     echo 'Start Chrome with "--remote-debugging-port=9222"'
//     false
// fi
