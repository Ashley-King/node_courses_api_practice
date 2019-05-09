const express = require('express');
const router = express.Router();


//test message
router.get('/', (req, res) => {
  res.render('index', {title: "my express app", message: "hello ya'll"})
})

module.exports = router;