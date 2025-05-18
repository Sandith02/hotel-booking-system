import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

// Export the actions
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Create API endpoints for auth
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // This will be replaced with actual API call later
      queryFn: (credentials) => {
        // Mock successful login
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          return {
            data: {
              user: {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
              },
              token: 'mock-jwt-token',
            },
          };
        }
        // Mock failed login
        return {
          error: {
            status: 401,
            data: {
              message: 'Invalid credentials',
            },
          },
        };
      },
    }),
    register: builder.mutation({
      // This will be replaced with actual API call later
      queryFn: (userData) => {
        return {
          data: {
            user: {
              id: '1',
              name: userData.name,
              email: userData.email,
            },
            token: 'mock-jwt-token',
          },
        };
      },
    }),
  }),
});

// Export the hooks
export const {
  useLoginMutation,
  useRegisterMutation,
} = authApiSlice;