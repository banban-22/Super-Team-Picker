const express = require('express');
const router = express.Router();
const knex = require('../db/client');

router.get('/cohorts', (request, response) => {
  response.render('new');
});

router.get('/cohorts/:id' , (request , response) => {
  const { id } = request.params;
  knex('teams')
  .where('id' , id)
  .then(cohort => {
    response.render('cohorts/single_show' , { cohort });
  }).catch(err => {
    console.error(err);
  })
});

module.exports = router;