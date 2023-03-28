const express = require('express');
const router = express.Router();

router.get('/cohorts', (request, response) => {
  response.render('new');
});

module.exports = router;
