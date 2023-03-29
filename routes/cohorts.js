const express = require('express');
const db = require('../db/client');
const router = express.Router();

// --------------- INDEX ----------------
router.get('/', (request, response) => {
  db('teams')
    .then((cohorts) => {
      console.log('cohorts', cohorts);
      response.status(200).render('cohorts/index', { cohorts });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

// --------------- CREATE NEW TEAM ----------------

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
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

// --------------- DELETE A TEAM ----------------
router.delete('/:id', (request, response) => {
  const { id } = request.params;
  console.log(id);

  knex('teams')
    .del()
    .where('id', id)
    .then((data) => {
      console.log(data);
      response.status(200).redirect('/cohorts');
    })
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

// --------------- EDIT A TEAM ----------------
router.get('/:id/edit', (request, response) => {
  const { id } = request.params;

  db('teams')
    .where('id', id)
    .first()
    .then((team) => {
      console.log(team);
      response.render('cohorts/edit', { team });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

router.patch('/:id', (request, response) => {
  const { logo_url, name_of_team, name_of_members } = request.body;
  const { id } = request.params;

  db('teams')
    .update({ logo: logo_url, team: name_of_team, members: name_of_members })
    .where('id', id)
    .then((data) => {
      console.log(data);
      response.status(200).redirect(`/cohorts/${id}`);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

module.exports = router;
