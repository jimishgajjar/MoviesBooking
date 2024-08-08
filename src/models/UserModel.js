// UserModel.js
import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class UserModel extends Model {
  static table = "users";

  @field("first_name") firstName;
  @field("last_name") lastName;
  @field("email") email;
  @field("mobile") mobile;
  @field("password") password;
}

export default UserModel;
