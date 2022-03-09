import { Get, Route , Query} from "tsoa";
import { extractImageWrapper } from "./extractImage";

@Route("/")
export default class ImageController {
  @Get("/ffmpeg/image")
  public async extractImage(@Query() timestamp: string, @Query() url: string) {
    return await extractImageWrapper(timestamp, url);
  }
}