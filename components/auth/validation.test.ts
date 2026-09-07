import { validateEmail, validatePassword } from './validation';

describe('validateEmail', () => {
  test('rejects an empty email', () => {
    expect(validateEmail('')).toBe('Email is required');
  });

  test('rejects an email missing an @', () => {
    expect(validateEmail('not-an-email')).toBe('Enter a valid email address');
  });

  test('rejects an email missing a domain', () => {
    expect(validateEmail('user@')).toBe('Enter a valid email address');
  });

  test('accepts a well-formed email', () => {
    expect(validateEmail('user@example.com')).toBeNull();
  });
});

describe('validatePassword', () => {
  test('rejects an empty password', () => {
    expect(validatePassword('')).toBe('Password is required');
  });

  test('rejects a password shorter than 6 characters', () => {
    expect(validatePassword('abc12')).toBe(
      'Password must be at least 6 characters',
    );
  });

  test('accepts a password of 6 or more characters', () => {
    expect(validatePassword('abc123')).toBeNull();
  });
});
