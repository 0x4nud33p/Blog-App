import mongoose, { Schema } from "mongoose";

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
    likeCount: {
      type: Number,
      default: 0,
    },
    bookmarkCount: {
      type : Number,
      default : 0,
    },
    isLiked : {
      type : Boolean,
      default : false,
    },
    isBookmarked : {
      type : Boolean,
      default : false,
    },
    category: {
      type: String, 
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
