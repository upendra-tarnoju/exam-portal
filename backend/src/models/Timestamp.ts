import mongoose from "mongoose";

export default class Timestamp {
  _id: mongoose.Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}