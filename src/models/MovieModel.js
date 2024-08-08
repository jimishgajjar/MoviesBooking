// MovieModel.js
import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class MovieModel extends Model {
  static table = "movies";

  @field("title") title;
  @field("image_uri") image_uri;
  @field("type") type;
  @field("duration") duration;
  @field("language") language;
  @field("release_date") releaseDate;
  @field("description") description;
}

export default MovieModel;
