import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

// Auth context
const AuthContext = createContext();

// Auth actions
const authActions = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  AUTH_ERROR: 'AUTH_ERROR',
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case authActions.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case authActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case authActions.AUTH_ERROR:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.getProfile();
          dispatch({
            type: authActions.LOGIN_SUCCESS,
            payload: {
              user: response.data.data || response.data.user || response.data,
              token,
            },
          });
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch({ type: authActions.AUTH_ERROR });
        }
      } else {
        dispatch({ type: authActions.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: authActions.SET_LOADING, payload: true });
      const response = await authService.login(credentials);
      
      // Handle different response structures from backend
      const token = response.data.token || response.data.data?.token;
      const user = response.data.user || response.data.data?.user || response.data.data;
      
      if (!token || !user) {
        throw new Error('Invalid response structure');
      }
      
      console.log('Login successful, user object:', user); // Debug log
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: { user, token },
      });
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: authActions.AUTH_ERROR });
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: authActions.SET_LOADING, payload: true });
      const response = await authService.register(userData);
      
      // Handle different response structures from backend
      const token = response.data.token || response.data.data?.token;
      const user = response.data.user || response.data.data?.user || response.data.data;
      
      if (!token || !user) {
        throw new Error('Invalid response structure');
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: { user, token },
      });
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ type: authActions.AUTH_ERROR });
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Registration failed' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: authActions.LOGOUT });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
