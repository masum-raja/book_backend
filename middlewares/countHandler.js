const { CountModel } = require("../models/count.model");

const countApiCalls = async(req, res, next) => {
  try {
    const existingCount = await CountModel.findOne();
    let newCount = 1;

    if (existingCount) {
      newCount = existingCount.count + 1;
      await CountModel.findOneAndUpdate({}, { count: newCount });
    } else {
      await CountModel.create({ count: newCount });
    }

    next();
  } catch (error) {
    console.error('Error counting API calls:', error);
  }
}

module.exports = { countApiCalls };
