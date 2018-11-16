const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/payground', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log("Could not connect to MongoDB..."));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    try {
        const course = new Course({
            name: "Angular Course",
            author: "Mosh",
            tags: ["angular", "frontend"],
            isPublished: true
        });

        const result = await course.save();
        console.log(result);
    } catch(err) {
        console.log(new Error("Error: ", err.message));
    }
}

async function getCourses() {
    // COMPARISON OPERATOR
    // eq (equal)
    // neq (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // LOGICAL OPERATOR
    // or
    // and

    // REGEX
    // (^) Starts with
    // ($) Ends with
    // (.*) Contains it
    try {
        const courses = await Course
            //.find({ author: "Mosh", isPublished: true })
            //.find({ price: { $gte: 10, $lte: 20 } })
            //.find ({ price: { $in: [10, 15, 20] } })
            .find({ name: /Course/})
            //.or([ { author: "Mosh" }, { isPublished: true } ])
            //.and([ { author: "Mosh" }, { isPublished: true }, { name: "Angular Course"} ])
            //.limit(10)
            //.sort({ name: 1 })
            //.select({ name: 1, tags: 1, _id: 0 })
            .countDocuments()
            //.estimatedDocumentCount();
        console.log(courses);
    } catch(err) {
        console.log(new Error("Error getting courses...", err.message));
    }
}


//createCourse();
getCourses();

