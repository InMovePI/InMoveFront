import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth';
import AuthService from '../../services/auth';

vi.mock('../../services/auth');

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('register calls auth.register and logs user in', async () => {
    const fakeUser = { id: 1, email: 't@t.com' };
    AuthService.register = vi.fn().mockResolvedValue({ id: 1 });
    AuthService.login = vi.fn().mockResolvedValue({ access: 'a', refresh: 'r' });
    AuthService.getCurrentUser = vi.fn().mockResolvedValue(fakeUser);
    const store = useAuthStore();
    await store.register({ email: 't@t.com', name: 't', password: 'pass' });
    expect(AuthService.register).toHaveBeenCalled();
    expect(AuthService.login).toHaveBeenCalled();
    expect(store.user).toEqual(fakeUser);
  });

  it('login sets user after successful login', async () => {
    const fakeUser = { id: 2, email: 'b@b.com' };
    AuthService.login = vi.fn().mockResolvedValue({ access: 'aa', refresh: 'rr' });
    AuthService.getCurrentUser = vi.fn().mockResolvedValue(fakeUser);
    const store = useAuthStore();
    await store.login('b@b.com', 'pwd');
    expect(store.user).toEqual(fakeUser);
  });
});
