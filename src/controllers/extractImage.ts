import { exec } from "child_process";
import { readFileSync } from "fs";

const acceptedExtention: string[] = ["mp4", "webm"];

function extractVideoUrlExtention(url: string) {
    const processedUrl: string[] = url.split(".");
    const extention: string = processedUrl.pop();

    return acceptedExtention.includes(extention);
}

function extractImage(timestamp: string, url: string, callback) {
    const validUrl: boolean = extractVideoUrlExtention(url);
    const epoch: number = +timestamp;
    const ts:string = new Date().toISOString();

    if (validUrl) {
        try {
            exec(
                `ffmpeg -ss ${epoch} -i ${url} -vframes 1 -vcodec png -an -y img_${ts}.png`,
                function (error, stdout, stderr) {
                    if (error) {
                        console.log(error);
                        console.log("Error code: " + error.code);
                        console.log("Signal received: " + error.signal);
                        return callback(null, "Something went wrong!");
                    }
                    console.log("STDOUT: " + stdout);
                    console.log("STDERR: " + stderr.includes("Output file is empty"));
                    if (stderr.includes("Output file is empty")) {
                        return callback(null, `Check your timestamp! Frame is not available for ${timestamp} seconds!`);
                    } else {
                        callback(readFileSync(`img_${ts}.png`, { encoding: "base64" }));
                    }
                }
            );
        } catch (err) {
            throw err;
        }
    } else {
        throw new Error("Invalid Url Supplied!");
    }
}
export function extractImageWrapper(timestamp: string, url: string) {
    return new Promise((resolve)=>{
        extractImage(timestamp, url, (data: string, err: string) => {
            if (err) {
                return resolve({ message: err, status: false });
            } else {
                return resolve({ data, status: true });
            }
        });
    })

}
