import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: [true,"please provide lecture title"],
  },
  videoInfo: {
    publicId: {
      type: String,
      required: [true, "Please provide video public id"],
    },
    videoUrl: {
      type: String,
      required: [true, "Please provide video URL"],
    }
  },
  isPreviewFree: { type: Boolean },
},{timestamps:true});

export const Lecture = mongoose.model("Lecture", lectureSchema);