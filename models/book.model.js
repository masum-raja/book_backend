const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BookSchema = Schema(
  {
    uuid: String,
    bookName: String,
    description: String,

  },
  { versionKey: false, timestamps: true }
);

const BookModel = model("book", BookSchema);

module.exports = { BookModel };
