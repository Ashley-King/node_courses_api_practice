// for env vars
require('dotenv').config()

//dependencies
const debug = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const app = express();
const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')
const authenticator = require('./middleware/authentication')
const helmet = require('helmet')
const morgan = require('morgan')


app.set('view engine', 'pug');
app.set('views', './views');

//configuration
console.log("Application Name " + config.get('name'))
console.log("Mail Server Name " + config.get('mail.host'))



//middleware
app.use(express.json()); //parses req.body
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(authenticator);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// enable console logging of requests in dev
if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug("Morgan enabled - dev environment")
}

//db debugger
debug("Connected to database...");

//configure port for main server
const port = process.env.PORT || 3000;

//validation
const Joi = require('@hapi/joi');
// error status message
const error404Message = "That one ain't here, yo."

const validateName = (name) =>{
 const schema = {
  name: Joi.string().min(3).required(),
 };
 return Joi.validate(name, schema); 
}// validateName





//listen up here
app.listen(port, () => console.log(`Server is serving on port ${port}`));

