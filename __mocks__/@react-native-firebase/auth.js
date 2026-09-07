const mockAuthInstance = { currentUser: null };

module.exports = {
  getAuth: jest.fn(() => mockAuthInstance),
  onAuthStateChanged: jest.fn((_auth, callback) => {
    callback(mockAuthInstance.currentUser);
    return jest.fn();
  }),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  __mockAuthInstance: mockAuthInstance,
};
