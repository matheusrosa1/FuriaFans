import '@testing-library/jest-dom';

// jest.setup.js ou jest.setup.ts

Object.defineProperty(globalThis.crypto, 'randomUUID', {
  value: () => 'mocked-uuid',
});
