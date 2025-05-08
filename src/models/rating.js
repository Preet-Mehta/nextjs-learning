import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5, required: true }, // String is shorthand for {type: String}
    book_id: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Rating || mongoose.model("Rating", ratingSchema);
