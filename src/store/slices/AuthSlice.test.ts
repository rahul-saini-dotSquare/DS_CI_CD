import authReducer, {
  setToken,
  setUser,
  logout,
} from '@store/slices/AuthSlice';
import { AuthUser } from '@api/models/response';

const user: AuthUser = { id: '1', name: 'Jane', email: 'jane@example.com' };

describe('AuthSlice', () => {
  const initialState = { token: null, user: null };
  it('sets the token', () => {
    const state = authReducer(initialState, setToken('abc'));
    expect(state.token).toBe('abc');
  });
  it('sets the user', () => {
    const state = authReducer(initialState, setUser(user));
    expect(state.user).toEqual(user);
  });
  it('clears token and user on logout', () => {
    const loggedIn = { token: 'abc', user };
    const state = authReducer(loggedIn, logout());
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});
