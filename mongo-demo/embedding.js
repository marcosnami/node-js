const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workarea', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const authorSchemaArray = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  });

const Author = mongoose.model('Author', authorSchema);
const AuthorArray = mongoose.model('AuthorArray', authorSchemaArray);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
      type: authorSchema,
      required: true
  }
}));

const CourseArray = mongoose.model('CourseArray', new mongoose.Schema({
    name: String,
    authors: {
        type: [ authorSchemaArray ],
        required: true
    }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function createCourseArray(name, authors) {
    const course = new CourseArray({
      name, 
      authors
    }); 
    
    const result = await course.save();
    console.log(result);
}
  
async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(id) {
    let course = await Course.findById(id)
    course.author.name = 'Mosh Hammed';
    course = await course.save();
    console.log(course);
}

async function updateAuthorI(id) {
    const result = await Course.updateOne({ _id: id }, {
        $unset: {
            "author.website": ""
        }
    });
    console.log(result);
}

async function updateAuthorII(id) {
    const course = await Course.findOneAndUpdate(id, {
        "author.name": "Smith Larson"
    }, { new: true });
    console.log(course);
}

async function addAuthor(id, author) {
    let course = await CourseArray.findById(id);
    course.authors.push(author);
    course = await course.save();
    console.log(course);    
}

async function removeAuthor(courseId, authorId) {
    let course = await CourseArray.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course = await course.save();
    console.log(course);
}


// createCourse('Node Course', new Author({ name: 'Mosh', bio: 'My bio', website: 'My website' }));
// updateAuthor('5bf4ccb5d602221dae15b7b9');
// updateAuthorI('5bf4ccb5d602221dae15b7b9');
// updateAuthorII('5bf4ccb5d602221dae15b7b9');

// Dealing with an array of authors
// createCourseArray(
//     'Node Course', 
//     [ 
//         new AuthorArray({ name: 'Mosh', bio: 'My bio', website: 'My website' }),
//         new AuthorArray({ name: 'John', bio: 'The bio', website: 'The website' }) 
//     ]);

addAuthor('5bf4db98e66f972758e57ff4', new AuthorArray({ name: 'Amy', bio: 'She bio', website: 'She website' }));
// removeAuthor('5bf4db98e66f972758e57ff4', '5bf4dd67b937e4282d62313f');