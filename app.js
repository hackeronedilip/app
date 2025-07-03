// app.js
const express = require('express');
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./users');





const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  try {
    const user = createUser(req.body.name, req.body.email);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/users/:id', (req, res) => {
  const user = getUser(parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.put('/users/:id', (req, res) => {
  const updatedUser = updateUser(parseInt(req.params.id), req.body);
  if (!updatedUser) return res.status(404).json({ error: 'User not found' });
  res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
  const deleted = deleteUser(parseInt(req.params.id));
  if (!deleted) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
});

module.exports = app;
