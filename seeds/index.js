const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63ed3209b2ed5b62d4ffb008",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cum, nulla temporibus repellat molestias dolore rem odio commodi asperiores laborum iste optio expedita, deserunt magnam repudiandae accusantium dolorem! Enim, harum.",
      price,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dmrxe1ogr/image/upload/v1677311703/YelpCamp/kffy65dtjjwo8gcqbxxj.jpg",
          filename: "YelpCamp/kffy65dtjjwo8gcqbxxj",
        },
        {
          url: "https://res.cloudinary.com/dmrxe1ogr/image/upload/v1677311704/YelpCamp/mouenkeahtt5mgsjqew9.jpg",
          filename: "YelpCamp/mouenkeahtt5mgsjqew9",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
