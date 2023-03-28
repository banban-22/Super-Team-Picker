const express = require('express');
const db = require('../db/client');
const router = express.Router();

router.get('/', (request, response) => {
  db('teams')
    // .select('id', 'name_of_team', 'name_of_members', 'created_at')
    // .orderBy('created_at', 'DESC')
    .then((cohorts) => {
      console.log('cohorts', cohorts);
      response.status(200).render('cohorts/index', { cohorts });
    })
    .catch((err) => {
      console.error(err);
      //   response.status(500).render('error', { err });
    });
});

router.get('/new', (request, response) => {
  response.render('cohorts/new');
});

router.post('/new', (request, response) => {
  console.log(request.body);
  const { logo_url, name_of_team, name_of_members } = request.body;

  db('teams')
    .insert({ logo_url, name_of_team, name_of_members })
    .then((data) => {
      console.log('data', data);
      response.status(201).redirect('/cohorts');
    })
    .catch((err) => console.error(err));
});

module.exports = router;
