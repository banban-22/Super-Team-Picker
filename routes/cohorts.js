const express = require('express');
const db = require('../db/client');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');

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

  if (name_of_team === '' || name_of_members === '') {
    response
      .status(400)
      .render('error', { err: 'Please fill in required fields' });
  }

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

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const parsedurl = url.parse(request.url);
  const query = querystring.parse(parsedurl.query);
  let number = query.number;
  db('teams')
    .where('id', id)
    .first()
    .then((data) => {
      let members = data.name_of_members.split(',');
      if (number && query.radio) {
        if (members.length < number) {
          response.send(
            '<h2>The number of teams should be less than the number of members.</h2>'
          );
        } else {
          let temp = [];
          let final = [];

          function split(arr) {
            if (arr.length == 1) {
              temp.push(arr[0]);
            } else {
              let random = Math.floor(Math.random() * arr.length);
              temp.push(arr[random]);
              arr.splice(random, 1);
              split(arr);
            }
          }
          split(members);

          if (query.radio == 'member') {
            number = Math.ceil(temp.length / number);
          }

          for (let i = 0; i < number; i++) {
            final.push([]);
          }

          while (temp.length != 0) {
            for (let j = 0; j < number; j++) {
              final[j].push(temp.pop());
              if (temp.length == 0) {
                break;
              }
            }
          }

          response.render('cohorts/show', { data, final });
        }
      } else {
        response.render('cohorts/show', { data, final: '' });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

// --------------- EDIT TEAM ----------------

router.get('/:id/edit', (request, response) => {
  const { id } = request.params;
  db('teams')
    .where('id', id)
    .then((team) => {
      console.log(team);
      response.render('cohorts/edit', ...team);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

router.patch('/:id', (request, response) => {
  let { logo_url, name_of_team, name_of_members } = request.body;

  db('teams')
    .update({
      logo_url: logo_url,
      name_of_team: name_of_team,
      name_of_members: name_of_members,
    })
    .where('id', request.params.id)
    .then((data) => {
      response.redirect('/cohorts/' + request.params.id);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

// --------------- DELETE TEAM ----------------

router.delete('/:id', (request, response) => {
  //delete post
  db('teams')
    .del()
    .where('id', request.params.id)
    .then((data) => {
      response.redirect('/cohorts');
    })
    .catch((err) => {
      console.error(err);
      response.status(500).render('error', { err });
    });
});

module.exports = router;
