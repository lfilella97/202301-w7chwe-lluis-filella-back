import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  avatar: {
    type: String,
    require: false,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "userShema",
      require: false,
    },
  ],
  enemies: [
    {
      type: Schema.Types.ObjectId,
      ref: "userShema",
      require: false,
    },
  ],
});

const User = model("User", userSchema, "users");

export default User;
