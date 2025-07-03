// users.js
let users = [];
let idCounter = 1;

function createUser(name, email) {
  if (!name || !email) throw new Error('Name and email required');
  const user = { id: idCounter++, name, email };
  users.push(user);
  return user;
}

function getUser(id) {
  return users.find(u => u.id === id);
}

function updateUser(id, data) {
  const user = getUser(id);
  if (!user) return null;
  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;
  return user;
}

function deleteUser(id) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

function resetUsers() {
  users = [];
  idCounter = 1;
}

module.exports = { createUser, getUser, updateUser, deleteUser, resetUsers };
