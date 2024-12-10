const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../models/TourModel');
const path = require('path');

dotenv.config({ path: '../../config.env' });
const connectToDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://ManojKumar:manoj1234@cluster0.qo8zr.mongodb.net/natours?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('connection successfull');
  } catch (e) {
    console.log(e);
  }
};
connectToDB();

//Read JSON File

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, '', 'tours-simple.json'), 'utf8')
);

//IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data loaded');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete'){
    deleteData();
}
