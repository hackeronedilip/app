// users.test.js
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  resetUsers,
} = require('./users');

beforeEach(() => {
  resetUsers();
});

test('createUser adds a user', () => {
  const user = createUser('Alice', 'alice@example.com');
  expect(user.id).toBe(1);
  expect(user.name).toBe('Alice');
});

test('getUser returns the user by id', () => {
  const user = createUser('Bob', 'bob@example.com');
  expect(getUser(user.id)).toEqual(user);
});

test('updateUser modifies user fields', () => {
  const user = createUser('Charliess', 'charlie@example.com');
  const updated = updateUser(user.id, { name: 'Charles' });
  expect(updated.name).toBe('Charles');
});

test('deleteUser removes a user', () => {
  const user = createUser('Dave', 'dave@example.com');
  const result = deleteUser(user.id);
  expect(result).toBe(true);
  expect(getUser(user.id)).toBeUndefined();
});

test('createUser throws error when missing fields', () => {
  expect(() => createUser(null, null)).toThrow('Name and email required');
});

test('getUser returns undefined for non-existent user', () => {
  expect(getUser(999)).toBeUndefined();
});

test('updateUser throws error for non-existent user', () => {
  expect(() => updateUser(999, { name: 'NonExistent' })).toThrow('User not found');
});

test('deleteUser returns false for non-existent user', () => {
  expect(deleteUser(999)).toBe(false);
});

test('createUser assigns unique IDs to users', () => {
  const user1 = createUser('Eve', 'eve@example.com');
  const user2 = createUser('Frank', 'frank@example.com');
  expect(user1.id).not.toBe(user2.id);
});
 
  
  test('createUser throws error when missing fields', () => {
    expect(() => createUser(null, null)).toThrow('Name and email required');
  });
  