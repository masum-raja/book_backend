const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CountSchema = Schema(
  {
    count: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

const CountModel = model("count", CountSchema);

module.exports = { CountModel };
