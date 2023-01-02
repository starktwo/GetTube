const readline = require("readline");
const fs = require('fs');
const ytdl = require('ytdl-core');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, });

let userInput = "";
rl.question("[GETTUBE] > Please send video url.\n", async function (string) {
    userInput = string;
    if (!userInput.length) return console.log("[GETTUBE] > Please send video url.") && setTimeout(() => {
        rl.close();
    }, 2000);
    try {
        const info = await ytdl.getInfo(userInput);
        console.log(`Downloading... ${info.videoDetails.title}`)
        ytdl(userInput).pipe(fs.createWriteStream(info.videoDetails.title + ".mp4"));
        console.log(`[GETTUBE] > Downloaded ${info.videoDetails.title}`)
        console.log(`[GETTUBE] > Pls Restart program for new download!`)
        setTimeout(() => {
            rl.close();
        }, 4000);

    } catch (e) {
        console.log(e);
    }
});
