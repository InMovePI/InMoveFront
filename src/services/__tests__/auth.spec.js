import { describe, it, expect, beforeEach, vi } from 'vitest';
import AuthService from '../auth';
import api from '../api';

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    // reset header
    api.defaults.headers.common['Authorization'] = undefined;
  });

  it('login stores tokens and sets auth header', async () => {
    vi.spyOn(api, 'post').mockResolvedValue({ data: { access: 'a-token', refresh: 'r-token' } });
    const result = await AuthService.login('test@example.com', 'password123');
    expect(localStorage.getItem('access_token')).toBe('a-token');
    expect(localStorage.getItem('refresh_token')).toBe('r-token');
    expect(api.defaults.headers.common['Authorization']).toBe('Bearer a-token');
    expect(result.access).toBe('a-token');
  });

  it('register sends post and returns data', async () => {
    vi.spyOn(api, 'post').mockResolvedValue({ data: { id: 1, email: 't@t.com' } });
    const payload = { email: 't@t.com', name: 'test', password: 'pass' };
    const created = await AuthService.register(payload);
    expect(created.id).toBe(1);
  });
});
