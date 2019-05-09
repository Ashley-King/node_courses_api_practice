const express = require('express')
const router = express.Router();

//courses array
// create courses
const courses = [
 {
  id: 1,
  name: 'NodeJs'
 },
 {
  id: 2,
  name: 'GatsbyJs'
 },
 {
  id: 3,
  name: 'REACT'
 },
 {
  id: 4,
  name: 'PostgreSQL'
 },
 {
  id: 5,
  name: 'Ruby on Rails'
 },
 {
  id: 6,
  name: 'Django'
 },
 {
  id: 7,
  name: 'Flask'
 },
 {
  id: 8,
  name: 'Hugo'
 },
 {
  id: 9,
  name: 'Jekyll'
 },
 {
  id: 10,
  name: 'VueJs'
 },
 
];



//get list of courses
router.get('/', (req,res) => {
 if(typeof courses === 'undefined' || courses.length === 0) return res.status(404).send("404 that...keep moving...nothing to see here"); 
 res.send(courses);
})

//get a single course
router.get('/:id', (req, res) => {
 const genreId = parseInt(req.params.id);
 const course = courses.find(g => g.id === genreId);
 if(!course) return res.status(404).send(`${error404Message}`);
 res.send(course);
 res.end();
})

// create a course
router.post('/', (req, res) => {
 const lastId = courses[courses.length -1].id;
 const newGenre = {
   id: lastId + 1,
   name: req.body.name,
  }
  
  const result = validateName(req.body);
  
  if(result.error) return res.status(400).send(result.error.details[0].message);
  courses.push(newGenre);
   res.send(newGenre);
  res.end();

})

//update a course
router.put('/:id', (req, res) => {
 const oldGenreId = parseInt(req.params.id);
 const course = courses.find(g => g.id === oldGenreId);
 if(typeof course === 'undefined'){
  return res.status(404).send("That one ain't here, yo.")
 }
 const result = validateName(req.body);
 if(result.error) return res.status(400).send(result.error.details[0].message);
 
  course.name = req.body.name
  res.send(course);
  res.end();

})//put 

// delete course
router.delete('/:id', (req, res) => {
 const course = courses.find(g => g.id === parseInt(req.params.id));
 if(typeof course === 'undefined') return res.status(404).send(`${error404Message}`);
 const genreIndex = courses.indexOf(course);
 courses.splice(genreIndex, 1);
 res.send(course);
})

module.exports = router;