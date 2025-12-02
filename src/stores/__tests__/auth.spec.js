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
    // mock login via auth service
    vi.spyOn(AuthService, 'login').mockResolvedValue({ access: 'a', refresh: 'r' });
    vi.spyOn(AuthService, 'getCurrentUser').mockResolvedValue(fakeUser);
    const store = useAuthStore();
    await store.register({ email: 't@t.com', name: 't', password: 'pass' });
    expect(AuthService.register).toHaveBeenCalled();
    expect(AuthService.login).toHaveBeenCalled();
    expect(store.user).toEqual(fakeUser);
  });

  it('login sets user after successful login', async () => {
    const fakeUser = { id: 2, email: 'b@b.com' };
    vi.spyOn(AuthService, 'login').mockResolvedValue({ access: 'aa', refresh: 'rr' });
    vi.spyOn(AuthService, 'getCurrentUser').mockResolvedValue(fakeUser);
    const store = useAuthStore();
    await store.login('b@b.com', 'pwd');
    expect(store.user).toEqual(fakeUser);
  });

  it('updateProfile updates the user when API returns data', async () => {
    const updatedUser = { id: 3, name: 'Updated', email: 'u@u.com' };
    AuthService.update = vi.fn().mockResolvedValue(updatedUser);
    const store = useAuthStore();
    await store.updateProfile({ name: 'Updated' }, false);
    expect(AuthService.update).toHaveBeenCalled();
    expect(store.user).toEqual(updatedUser);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(updatedUser);
  });
});
