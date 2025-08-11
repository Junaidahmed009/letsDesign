import moongose from "mongoose";

const userSchema = new moongose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false } // ⬅ disables __v
);
//the third parameter is name of collection in Db in which the userschemadata will be saved
export default moongose.model("userSchema", userSchema, "UserAuth");
