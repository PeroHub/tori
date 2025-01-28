import { Schema, model, models } from "mongoose";

const UserPreferenceSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  activities: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserPreference =
  models.UserPreference || model("UserPreference", UserPreferenceSchema);

export default UserPreference;
