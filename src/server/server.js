const express = require('express');
const bodyParser = require('body-parser');

// Controllers
const { dataController } = require('./controllers/dataController.js');
const { searchController } = require('./controllers/searchController.js');

// //Authentication
// const bcrypt = require('bcrypt-nodejs');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const knex = require('../db/index.js');

// //Router
// const searchRouter = require('./routes/searchRoutes');
// const specialtyRouter = require('./routes/specialty');
// const insuranceRouter = require('./routes/insurance');

// const conditionsRouter = require('./routes/conditions');
// const favoritesRouter = require('./routes/favorites');
// const commentsRouter = require('./routes/comments');
// const locationRouter = require('./routes/locationRoutes');
// // const userRouter = require('./routes/users');

//express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

//Authentication
// app.use(cookieParser());
// app.use(session({
//   secret: 'secret!',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {maxAge: 6000000}
// }));


// const passport = require('./auth/googleAuth.js');
// app.use(passport.initialize());
// app.use(passport.session());

//added routers for each endpoint which can be found in the routes folder
app.use('/data', dataController);
app.use('/search', searchController);
// app.use('/specialties', specialtyRouter);
// app.use('/insurance', insuranceRouter);

// app.use('/conditions', conditionsRouter);
// app.use('/favorites', favoritesRouter);
// app.use('/comments', commentsRouter);
// app.use('/location', locationRouter);
// app.use('/user', userRouter);


//Authentication

// app.post('/signup', (req, res) => {
//   //salt rounds for bcrypt
//   let saltRounds = 10;
//   //data coming from signup input fields
//   let username = req.body.username;
//   let password = req.body.password;
//   let firstName = req.body.firstName;
//   let lastName = req.body.lastName;
//   let zipCode = req.body.zipCode;
//   let age = req.body.age;
//   let gender = req.body.gender;
//   let email = req.body.email;
//   //bcrypt
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash(password, salt, null, (err, hash) => {
//       knex('Users').insert({
//         username: username,
//         password: hash,
//         firstName: firstName,
//         lastName: lastName,
//         zipCode: zipCode,
//         gender: gender,
//         age: age,
//         email: email
//       })
//       .then(resp => {
//         //express session begins after signup
//         req.session.regenerate(() => {
//           //we added a username property to attach to session to
//           //pass to app.jsx
//           req.session.username = username;
//         });
//       })
//       .catch(err => { res.status(401).send(err); });
//     });
//   });
// });


// //handles login post request
// app.post('/login', (req, response) => {
//   //data comes from login component
//   let username = req.body.username;
//   let password = req.body.password;
//   knex('Users').where({username: username})
//   .select('password')
//   .then(resp => {
//     if (resp[0]) {
//       bcrypt.compare(password, resp[0].password, (err, res) => {
//         //if res is truthy
//         if (res) {
//           //set session.username to username provided from login
//           req.session.username = username;
//           //regenerate session
//           req.session.regenerate(() => {
//             req.session.username = username;
//             response.status(201);
//             response.send(req.session);

//           });
//         } else {
//           response.status(401);
//           response.send({status: 'badPassword'});

//         }
//       });
//     } else {

//       response.send({status: 'badUser'});
//     }
//   })
//   .catch(err => console.log('ERROR CAUGHT:', err));
// });

// //handles query posts and saves it into the db
// app.post('/queries', (req, res) => {
//   //save user search queries to db
//   knex('Queries').insert({
//     usersUsername: req.body.user,
//     query: req.body.query,
//     timeStamp: req.body.timeStamp

//   })

//   .catch();
// });





// //handles logout post, destroys the session
// app.post('/logout', (req, res) => {
//   //destroy session
//   req.session.destroy();
// });


// app.get('/authenticate', (req, res) => {
//   //auth check

//   res.send({
//     //send back to app.jsx an object with status
//     //and username keys
//     status: req.session.username ? !!req.session.username : false,
//     user: req.session.username || null
//   });
// });


let port = process.env.PORT || 5050;
//creates server connection
app.listen(port, () => {
  console.log(`Connected to port ${port}...`);
});
