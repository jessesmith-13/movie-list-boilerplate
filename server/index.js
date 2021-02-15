const express = require('express');
const path = require('path');
// const { default: App } = require('../client/src/components/App');
const db = require('../db');
const movieDB = require('../themoviedb.js')

const PORT = 3000 || process.env.PORT;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

const loggingMiddleware = (req, res, next) => {
  const logStr = `${req.method} request coming in for ${req.url}`;
  console.log(logStr);
  next();
};

app.use(loggingMiddleware);
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

/*----------------------------------------MIDDLEWARE------------------------------------------------*/

app.get('/api/movies', (req, res) => {

  var sql = `
      SELECT * FROM movies
    `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(results);
    }
  })
})

app.get('https://api.themoviedb.org/3/search/movie/550?api_key=6ad4dc5c9464fbf3124d44bea02eef85&query=jumanji', (req, res) => {
  console.log(movieDB.movies.getReviews);
})


app.post('/api/movies', (req, res) => {
  const { title, year, score } = req.body
  var sql = `
    INSERT INTO movies (title, year, score) VALUES(?,?,?)
  `;

  db.query(sql, [title, year, score], (err, results) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(201);
    }
  })
})

app.put('/api/movies', (req, res) => {
  // if (req.body.watched) {
    if (req.body.rating) {
      
      const { rating, id } = req.body;
      var sql = `
        UPDATE movies
        SET rating = ?
        WHERE id = ?
      `;
      var queryArgs = [rating, id];
      db.query(sql, queryArgs, (err, results) => {
        if (err) {
          console.log(err);
          res.send(500);
        } else {
          res.send(200);
        }
      })
    } else {
      const { watched, id } = req.body;
      var sql = `
        UPDATE movies
        SET watched = ?
        WHERE id = ?
      `;
      var queryArgs = [watched, id];
      db.query(sql, queryArgs, (err, result) => {
        if (err) {
          console.log(err);
          res.send(500);
        } else {
          res.send(200);
        }
      })
    }
    
  // }

})

app.delete('/api/movies', (req, res) => {
  const { id } = req.body;
  var sql = `
    DELETE FROM movies WHERE id = ?  
  `

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(200);
    }
  })
})


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})