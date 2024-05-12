const express = require('express')
const countRouter = express.Router()
const path = require('path')
const { CountModel } = require("../models/count.model");

// @route    GET count/
// @desc     Get count
// @access   Public
countRouter.get('/', async (req, res) => {
    try {
      const data = await CountModel.find()
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send({ message: "Something went wrong", error: err });
    }
});

module.exports = countRouter;
