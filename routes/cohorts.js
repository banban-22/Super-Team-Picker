const express = require('express');
const db = require('../db/client');
const router = express.Router();

router.get('/', (request, response) => {
  db('cohorts')
    .select('id', 'name_of_team', 'name_of_members', 'logo_url')
    .orderBy('created_at', 'DESC')
    .then((cohorts) => {
      console.log('cohorts', cohorts);
      response.status(200).render('/cohorts/index', { cohorts });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

router.get('/cohorts', (request, response) => {
  response.render('new');
});

module.exports = router;
