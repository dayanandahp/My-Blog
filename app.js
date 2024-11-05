// app.js
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port =3000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// EJS Setup
app.set('view engine', 'ejs');

// In-memory post storage
let posts = [];


app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('new');
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const id = posts.length;
  posts.push({ id, title, content });
  res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
  const post = posts[req.params.id];
  res.render('edit', { post });
});

app.post('/posts/:id/edit', (req, res) => {
  const { title, content } = req.body;
  posts[req.params.id] = { id: req.params.id, title, content };
  res.redirect('/');
});

app.post('/posts/:id/delete', (req, res) => {
  posts.splice(req.params.id, 1);
  posts = posts.map((post, index) => ({ ...post, id: index }));
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});