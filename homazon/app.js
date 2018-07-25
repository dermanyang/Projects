import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import MongoStoreLib from 'connect-mongo';
var MongoStore = MongoStoreLib(session);
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/auth'
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI);
var app = express();

import User from './models/models'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//    PASSPORT STUFF

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

passport.use(new LocalStrategy(function(username, password, done){
  console.log('LOCAL STRAT');
  User.User.findOne({ username })
  .then(function(user){
    if (!user){
      console.log('1');
      done(null, false);
    } else if (user.password !== password){
      console.log('2');
      done(null, false);
    } else {
      console.log('3');
      done(null, user);
    }
  })
  .catch(function(error){
    done(error);
  })
}))

passport.serializeUser((user, done) => {
  console.log('SERIALIZE');
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

//  routes

app.use('/', authRouter(passport));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;
