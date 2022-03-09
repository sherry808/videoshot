import express from "express";
import swaggerUi from "swagger-ui-express";
import ImageController from "./controllers/img.controller";
const app = express();
const port = 8070;

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "./swagger.json",
      },
    })
  );

app.get("/", (req, res) => {
    res.send("Hello, get your videoshot now!");
});

app.get("/ffmpeg/image", async(req, res) => {
    const query: string[] = req.url.split("?");
    const params = query[1];
    const qParams = new URLSearchParams(params);
    const timestamp: string = qParams.get("timestamp");
    const url: string = qParams.get("url");

    const controller= new ImageController();
    const response = await controller.extractImage(timestamp, url);
    return res.send(response);
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
