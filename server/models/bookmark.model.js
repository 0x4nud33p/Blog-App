import mongoose, { Schema } from "mongoose";

const bookmarkSchema = new Schema(
  {
    bookmarks: {
      type: [
        {
          blogId: String,
          bookmarkedBy: String,
        },
      ],
      default: [], 
    },
  },
  { timestamps: true }
);

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);