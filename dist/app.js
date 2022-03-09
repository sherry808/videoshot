"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const img_controller_1 = __importDefault(require("./controllers/img.controller"));
const app = (0, express_1.default)();
const port = 8070;
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "./swagger.json",
    },
}));
app.get("/", (req, res) => {
    res.send("Hello, get your videoshot now!");
});
app.get("/ffmpeg/image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.url.split("?");
    const params = query[1];
    const qParams = new URLSearchParams(params);
    const timestamp = qParams.get("timestamp");
    const url = qParams.get("url");
    const controller = new img_controller_1.default();
    const response = yield controller.extractImage(timestamp, url);
    return res.send(response);
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map