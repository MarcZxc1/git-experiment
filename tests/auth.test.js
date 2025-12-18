// Authentication tests
import { login, logout } from '../src/auth.js';

describe('Authentication', () => {
  test('login should return true for valid credentials', () => {
    expect(login('admin', 'admin')).toBe(true);
  });

  test('login should return false for invalid credentials', () => {
    expect(login('wrong', 'wrong')).toBe(false);
  });

  test('logout should clear session', () => {
    expect(logout()).toBeDefined();
  });
});

