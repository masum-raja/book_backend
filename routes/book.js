const express = require('express')
const bookRouter = express.Router()
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { BookModel } = require("../models/book.model");
const { countApiCalls } = require('../middlewares/countHandler');

// @route    GET BookList/
// @desc     Get all BookList
// @access   Public
bookRouter.get('/', async (req, res) => {
    try {
      const data = await BookModel.find()
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send({ message: "Something went wrong", error: err });
    }
});

// @route    POST route/create/
// @desc     Create a BookList
// @access   Public
bookRouter.post("/create", countApiCalls, async (req, res) => {
  try {

    const post_to_add = new BookModel(req.body);
    post_to_add['uuid'] = uuidv4();

    await post_to_add.save();
    res.send({ message: "BookList created Successfully" });

  } catch (error) {
    console.log(error);
    res.send({ message: "Something went wrong", error: error });
  }
});

// @route    PATCH book/update/:uuid
// @desc     Update a book
// @access   Public
bookRouter.patch("/update/:uuid", countApiCalls, async (req, res) => {
  const ID = req.params.uuid;
  try {
    const book = await BookModel.findOne({ uuid: ID });

    if (book) {
      await BookModel.findByIdAndUpdate(book._id, req.body);
      res.send({ message: "BookList updated successfully" });
    } else {
      res.status(404).send({ message: "Book not found" });
    }
    
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong", error: err });
  }
});

module.exports = bookRouter
