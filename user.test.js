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
    const user = createUser('Charlie', 'charlie@example.com');
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
  