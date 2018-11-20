const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log("Could not connect to MongoDB..."));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
    .find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i } ])
    .sort({ price: 1 })
    .select({ name: 1, author: 1, price: 1, _id: 0 });
}

async function run() {
    try {
        const courses = await getCourses();
        console.log(courses);
    } catch(err) {
        console.log(new Error("Error getting courses...", err.message));
    }
}

run();