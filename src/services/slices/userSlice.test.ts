import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  userReducer,
  UserState
} from './userSlice';

describe('userSlice', () => {
  const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loginRequest: false,
    isLoading: false,
    error: null
  };

  it('should handle registerUser pending', () => {
    const actualState = userReducer(
      { ...initialState },
      registerUser.pending('', { name: '', email: '', password: '' })
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle registerUser fulfilled', () => {
    const testUser = { name: 'Test', email: 'test@test.com' };
    const actualState = userReducer(
      { ...initialState },
      registerUser.fulfilled(testUser, '', {
        name: '',
        email: '',
        password: ''
      })
    );
    expect(actualState).toEqual({
      ...initialState,
      user: testUser,
      isAuthenticated: true,
      isLoading: false
    });
  });

  it('should handle registerUser rejected', () => {
    const testError = new Error('Error');
    const actualState = userReducer(
      { ...initialState },
      registerUser.rejected(testError, '', {
        name: '',
        email: '',
        password: ''
      })
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: testError.message
    });
  });

  it('should handle loginUser pending', () => {
    const actualState = userReducer(
      { ...initialState },
      loginUser.pending('', { email: '', password: '' })
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle loginUser fulfilled', () => {
    const testUser = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456'
    };
    const actualState = userReducer(
      { ...initialState },
      loginUser.fulfilled(testUser, '', { email: '', password: '' })
    );
    expect(actualState).toEqual({
      ...initialState,
      user: testUser,
      isAuthenticated: true,
      isLoading: false
    });
  });

  it('should handle loginUser rejected', () => {
    const testError = new Error('Error');
    const actualState = userReducer(
      { ...initialState },
      loginUser.rejected(testError, '', { email: '', password: '' })
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: testError.message
    });
  });

  it('should handle getUser pending', () => {
    const actualState = userReducer({ ...initialState }, getUser.pending(''));
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle getUser fulfilled', () => {
    const testUser = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456'
    };
    const actualState = userReducer(
      { ...initialState },
      getUser.fulfilled(testUser, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      user: testUser,
      isAuthenticated: true,
      isLoading: false
    });
  });

  it('should handle getUser rejected', () => {
    const testError = new Error('Error');
    const actualState = userReducer(
      { ...initialState },
      getUser.rejected(testError, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: testError.message
    });
  });

  it('should handle updateUser pending', () => {
    const actualState = userReducer(
      { ...initialState },
      updateUser.pending('', {})
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle updateUser fulfilled', () => {
    const testUser = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456'
    };
    const actualState = userReducer(
      { ...initialState },
      updateUser.fulfilled(testUser, '', {})
    );
    expect(actualState).toEqual({
      ...initialState,
      user: testUser,
      isAuthenticated: true,
      isLoading: false
    });
  });

  it('should handle updateUser rejected', () => {
    const testError = new Error('Error');
    const actualState = userReducer(
      { ...initialState },
      updateUser.rejected(testError, '', {})
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: testError.message
    });
  });

  it('should handle logoutUser fulfilled', () => {
    const actualState = userReducer(
      {
        ...initialState,
        user: { name: 'Test', email: 'test@test.com' },
        isAuthenticated: true
      },
      logoutUser.fulfilled(undefined, '', undefined)
    );
    expect(actualState).toEqual({
      ...initialState,
      user: null,
      isAuthenticated: false
    });
  });
});
