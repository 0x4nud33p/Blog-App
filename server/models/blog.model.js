import mongoose, { Schema } from "mongoose";
import { User } from "../models/user.model.js";

const blogSchema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
