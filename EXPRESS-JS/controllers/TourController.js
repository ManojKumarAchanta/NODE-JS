const mongoose = require('mongoose');
const Tour = require('../models/TourModel');
const getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    // 1A) FILTERING
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((ele) => delete queryObj[ele]);
    console.log(req.query, queryObj);

    // 1B)ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b{gte|gt|lte|lt}\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    let query = await Tour.find(JSON.parse(queryStr));
    // 2Sorting
console.log(query);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(':')[0];
      const sortOrder = req.query.sort.split(':')[1] === 'desc' ? -1 : 1;
      query = query.sort({ [sortBy]: sortOrder });
    }

    //EXECUTE QUERY
    const data = await query;
    res
      .status(200)
      .json({ status: 'success', toursLength: data.length, data: { data } });
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: 'fail', msg: e });
  }
};
const getTourById = async (req, res) => {
  try {
    const data = await Tour.findById(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: 'fail' });
  }
};
const createNewTour = async (req, res) => {
  try {
    const newTour = req.body;
    const r = await Tour.create(newTour);
    res.status(201).json({ status: 'success', msg: r });
  } catch (e) {
    res.status(400).json({ status: 'fail' });
  }
};
const updateTour = async (req, res) => {
  try {
    const r = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ status: 'success', updatedTour: r });
  } catch (e) {
    res.status(400).json({ status: 'fail' });
  }
};

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success' });
  } catch (e) {
    res.status(400).json({ status: 'fail' });
  }
};
module.exports = {
  getAllTours,
  getTourById,
  deleteTour,
  createNewTour,
  updateTour
};
