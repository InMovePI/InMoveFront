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
    const postSpy = vi.spyOn(api, 'post')
    const result = await AuthService.login('test@example.com', 'password123');
    expect(postSpy).toHaveBeenCalledWith('/api/token/', { email: 'test@example.com', password: 'password123' });
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

  it('update sends JSON object when not form and returns data', async () => {
    const updated = { id: 5, name: 'J' };
    const spy = vi.spyOn(api, 'patch').mockResolvedValue({ data: updated });
    const payload = { name: 'J' };
    const result = await AuthService.update(payload, false);
    expect(spy).toHaveBeenCalledWith('/api/usuarios/me/', payload, { headers: { 'Content-Type': 'application/json' } });
    expect(result).toEqual(updated);
  });

  // FormData support and profile picture flow was removed per user request
});
