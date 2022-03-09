"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractImageWrapper = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const acceptedExtention = ["mp4", "webm"];
function extractVideoUrlExtention(url) {
    const processedUrl = url.split(".");
    const extention = processedUrl.pop();
    return acceptedExtention.includes(extention);
}
function extractImage(timestamp, url, callback) {
    const validUrl = extractVideoUrlExtention(url);
    const epoch = +timestamp;
    const ts = new Date().toISOString();
    if (validUrl) {
        try {
            (0, child_process_1.exec)(
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
                        return callback(
                            null,
                            `Check your timestamp! Frame is not available for ${timestamp} seconds!`
                        );
                    } else {
                        callback(
                            (0, fs_1.readFileSync)(`img_${ts}.png`, { encoding: "base64" })
                        );
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
function extractImageWrapper(timestamp, url) {
    return new Promise((resolve) => {
        extractImage(timestamp, url, (data, err) => {
            if (err) {
                return resolve({ message: err, status: false });
            } else {
                return resolve({ data, status: true });
            }
        });
    });
}
exports.extractImageWrapper = extractImageWrapper;
//# sourceMappingURL=extractImage.js.map
