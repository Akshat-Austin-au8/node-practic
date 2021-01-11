const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength:100
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsyn: true,
            validator: function (v, callback)
            {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback();
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 100,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse()
{
    const course = new Course({
        name: 'Angular course',
        category: 'web',
        author: 'Akshat',
        tags: ['angular', 'frontend',],
        isPublished: true,
        price: 15.8
    });
    
    try
    {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        for (field in ex.error)
            console.log(ex.error[field]);
    }
}

async function getCourses()
{
    //---------------------------comparision operator
    // eq (equal)
    // ne (not equal)
    // gt (greater then)
    // gte (greater then or equal to)
    // lt (less then)
    // lte (less then or equal to)
    // in
    // nin (not in) 

    //---------------------------logical operator
    // or
    //and

    //---------------------------regular expression

    const pageNumer = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Akshat', isPublished: true })

        //---------------------------regular expression
        //start with akshat 
        // .find({ author: /^Akshat/ })
        // //end with austin 
        // .find({ author: /Austin$/i })
        // //Contains akshat 
        // .find({ author: /.*Akshat.*/i })

        //---------------------------logical operator
        // .find()
        // .or([{ author: 'Akshat' }, { isPublished: true }])
        // .and([ ])

        //---------------------------comparision operator
        // .find({ price: { $gte: 10, $lte: 20} })
        // .find({ price: { $in: [10, 15, 20]} })
        .skip((pageNumer - 1) * pageSize)
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 }); 
        // .count()
    console.log(courses);
}

async function updateCourse(id)
{
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Akshat',
            isPublished: false
        }
    });
    console.log(result);
}

async function removeCourse(id)
{
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

createCourse();