const config = require('./config/config');
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const Category = require('./models/categoryModel');
const Event = require('./models/eventModel');
const Message = require('./models/messageModel');
const Registration = require('./models/registrationModel');
const User = require('./models/userModel');

const categories = [
    {
        name: 'Music',
        description: 'Come to see your favorite singers live!'
    },
    {
        name: 'Sports',
        description: 'Come to watch sports matches with an audience and enjoy an unforgettable experience!'
    },
    {
        name: 'Chess',
        description: 'Come enjoy a fun time for chess lovers to expand their network and engage in play!'
    },
    {
        name: 'Tech',
        description: 'Come display your tech achievements and expand your network with fellow technophiles!'
    }
];

const events = [
    {
        title: 'Ariana Grande Concert',
        description: 'Come see Ariana live',
        city: 'Cairo',
        venue: 'The Great Hall',
        capacity: 120,
        category: 'music',
        date: undefined,
        registrationCount: 20
    },
    {
        title: 'Fan Gathering of World Cup',
        description: 'Come watch World Cup matches, especially egyptian ones, in the Fanzone!',
        city: 'Luxor',
        venue: 'The Fanzone',
        capacity: 400,
        category: 'sports',
        date: undefined,
        registrationCount: 130
    },
    {
        title: 'Chess Tournament for the Girlies',
        description: 'Chess girls can come and interact ',
        city: 'Tanta',
        venue: 'Non Al-Sahar Library',
        capacity: 320,
        category: 'chess',
        date: undefined,
        registrationCount: 13
    },
    {
        title: 'Tech Tournament',
        description: 'Present your most recent tech achievements and connect with people like you!',
        city: 'Alexandria',
        venue: 'Grand Hall',
        capacity: 210,
        category: 'tech',
        date: undefined,
        registrationCount: 200
    }
];

const users = [
    {
        name: 'John Doe',
        email: 'johnDoe1234@gmail.com',
        password: 'sfjlkWF_255!4',
        role: 'admin'
    },
    {
        name: 'Maddie Smith',
        email: 'maddie.smith.sonata@yahoo.com',
        password: '545asfgfTRESPASS_',
        role: 'attendee'
    }
]
const seed = async () => {
    let code;
    try {
        await connectDB();
        await Message.deleteMany({});
        await Registration.deleteMany({});
        await Event.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({});

        const createdCategories = await Category.insertMany(categories);
        const createdUsers = await User.create(users);

        const admin = createdUsers.find((u) => u.role === 'admin');

        const chess = createdCategories.find((c) => c.name.toLowerCase() === "chess");
        const tech = createdCategories.find((c) => c.name.toLowerCase() === "tech");
        const sports = createdCategories.find((c) => c.name.toLowerCase() === "sports");
        const music = createdCategories.find((c) => c.name.toLowerCase() === "music");

        const events = [
            {
                title: 'Ariana Grande Concert',
                description: 'Come see Ariana live',
                city: 'Cairo',
                venue: 'The Great Hall',
                capacity: 120,
                category: music._id,
                organiser: admin._id,
                date: new Date('2026-09-15'),
                registrationCount: 20
            },
            {
                title: 'Fan Gathering of World Cup',
                description: 'Come watch World Cup matches, especially egyptian ones, in the Fanzone!',
                city: 'Luxor',
                venue: 'The Fanzone',
                capacity: 400,
                category: sports._id,
                organiser: admin._id,
                date: new Date('2026-09-30'),
                registrationCount: 130
            },
            {
                title: 'Chess Tournament for the Girlies',
                description: 'Chess girls can come and interact ',
                city: 'Tanta',
                venue: 'Non Al-Sahar Library',
                capacity: 320,
                category: chess._id,
                organiser: admin._id,
                date: new Date('2026-11-10'),
                registrationCount: 13
            },
            {
                title: 'Tech Tournament',
                description: 'Present your most recent tech achievements and connect with people like you!',
                city: 'Alexandria',
                venue: 'Grand Hall',
                capacity: 210,
                category: tech._id,
                organiser: admin._id,
                date: new Date('2026-10-20'),
                registrationCount: 200
            }
        ];
        await Event.insertMany(events);
        code = 0;
        console.log(`Success! \n Users: ${users.length}, \n Categories: ${categories.length}, \n Events: ${events.length}`);
    } catch(err){
        console.error(err.message);
        code = 1;
    }finally{
        await mongoose.disconnect();
        process.exit(code);
    }
};

seed();