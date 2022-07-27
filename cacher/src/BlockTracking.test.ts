import Devtools from "@u4/chrome-remote-interface";
import Redis from "ioredis";
import BlockTracking from "./BlockTracking";
import CacheManager from "./CacheManager";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function testAll() {
    const devtools = new Devtools();
    const page = await devtools.connectNewPage();
    const cm = new CacheManager(new Redis());
    const blocker = new BlockTracking(cm);
    blocker.cache('www.google.com/maps/dir///');
    blocker.cache('www.google.com/maps/vt/');
    blocker.cache('www.google.com/images/');
    blocker.cache('www.google.com/js/');
    blocker.cache('www.google.com/maps/preview/pwa/manifest');
   
    blocker.cache('*.gstatic.com'); // www, maps, fonts
    blocker.cache('fonts.googleapis.com');
    blocker.cache('lh3.googleusercontent.com');

    blocker.ignore('ogs.google.com');
    blocker.ignore('play.google.com');
    blocker.block('tpc.googlesyndication.com/simgad/');
    blocker.ignore('tpc.googlesyndication.com/simgad/');
    blocker.block('www.google.com/gen_204');
    blocker.ignore('www.google.com/gen_204');
    blocker.block('www.google.com/maps/preview/log204');
    blocker.ignore('www.google.com/maps/preview/log204');
    
    
    // const blocker = new MyBlockTracking();
    await blocker.register(page);
    await page.Page.navigate({ url: 'https://www.google.com/maps/'});
    await page.Page.frameNavigated();
    await delay(5000);
    console.log('done');
}

testAll();