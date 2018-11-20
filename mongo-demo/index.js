const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/payground', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log("Could not connect to MongoDB..."));


const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        // Sync Validation
        // validate: {
        //     validator: function(v) {
        //         return v && v.length > 0;
        //     },
        //     message: 'A course should have at least one tag.'
        // }
        // Async Validation
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { 
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: { 
        type: Number,
        min: 10,
        max: 200,
        //required: function() { return this.isPublished; },
        required: function() { return this.isPublished; },
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    try {
        const course = new Course({
            name: "Angular Course",
            author: "Jason",
            category: "Web",
            tags: [ 'angular', 'frontend' ],
            //tags: null,
            isPublished: true,
            price: 12.8
        });

        const result = await course.save();
        console.log(result);
    } catch(err) {
        //console.log("Error: ", err.message);
        //console.log(err.errors.category);
        for(field in err.errors) {
            console.log(err.errors[field].message);
        }  
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
        const pageNumber = 1;
        const pageSize = 10;
        // /api/courses?pageNumber=2&pageSize=10

        const courses = await Course
            //.find({ author: "Mosh", isPublished: true })
            //.find({ price: { $gte: 10, $lte: 20 } })
            //.find ({ price: { $in: [10, 15, 20] } })
            .find({ name: /Course/})
            //.or([ { author: "Mosh" }, { isPublished: true } ])
            //.and([ { author: "Mosh" }, { isPublished: true }, { name: "Angular Course"} ])
            //.limit(10)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            //.sort({ name: 1 })
            //.select({ name: 1, tags: 1, _id: 0 })
            //.countDocuments()
            //.estimatedDocumentCount();
        console.log(courses);
    } catch(err) {
        console.log(new Error("Error getting courses...", err.message));
    }
}

async function updateCourse(id) {
    // Approach: Query first
    // findById();
    // Modify its properties
    // save()
    // const course = await Course
    //     .findById(id);
    // if(!course) {
    //     console.log("There is not a course with id: ", id);
    //     return;
    // }

    // // course.isPublished = true;
    // // course.author = 'Another Author';

    // course.set({
    //     isPublished: true,
    //     author: 'Another Great Author'
    // });

    // const result = await course.save();
    // console.log(result);

    // Approach: Update directly into DB
    // const result = await Course.updateOne({ _id: id }, {
    //     $set: {
    //         author: "Mosh",
    //         isPublished: false
    //     }
    // });
    // console.log(result);

    // Update a return a course
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: "Jack",
            isPublished: true
        }
    }, { new: true });

    console.log(course);

}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    // console.log(result);
    const course = await Course.findByIdAndDelete(id);
    console.log(course);

}


createCourse();
//getCourses();
//updateCourse("5bf0c8f68829e05e676e2617");
//removeCourse("5bf0ca0e4850b56092128941");
