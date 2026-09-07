const state = {
  snapshotCallback: null,
};

module.exports = {
  getFirestore: jest.fn(() => ({ __type: 'firestore' })),
  collection: jest.fn((_db, path) => ({ __type: 'collection', path })),
  doc: jest.fn((_db, path, id) => ({ __type: 'doc', path, id })),
  where: jest.fn((field, op, value) => ({ __type: 'where', field, op, value })),
  query: jest.fn((ref, ...constraints) => ({ __type: 'query', ref, constraints })),
  onSnapshot: jest.fn((_query, callback) => {
    state.snapshotCallback = callback;
    return jest.fn();
  }),
  addDoc: jest.fn(() => Promise.resolve({ id: 'new-id' })),
  updateDoc: jest.fn(() => Promise.resolve()),
  __state: state,
};
