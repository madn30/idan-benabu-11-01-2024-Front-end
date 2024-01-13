import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    data: [
      {
        key: { type: String, required: true },
        name: { type: String, required: true },
        country: { type: String, required: true },
        administrativeArea: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema);

export default Location;
