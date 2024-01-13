import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
  key: String,
  name: String,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
