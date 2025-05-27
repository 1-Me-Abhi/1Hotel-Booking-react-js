import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// API base URL
const API_URL = 'http://localhost:5000/api';

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user profile
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await response.json();
      setCurrentUser(userData);
      setIsAdmin(userData.isAdmin);
      return userData;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      localStorage.removeItem('token');
      setCurrentUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await fetchUserProfile(token);
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Register new user
  const register = async (email, password, displayName, phoneNumber, address, pincode, dateOfBirth) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          name: displayName,
          phoneNumber,
          address,
          pincode,
          dateOfBirth
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      await fetchUserProfile(data.token);
      return data.user;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
      throw err;
    }
  };

  // Sign in user
  const login = async (email, password) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      await fetchUserProfile(data.token);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with Google (Note: This needs to be implemented on the backend)
  const googleLogin = async () => {
    setError('');
    try {
      // For now, we'll use a mock implementation
      const mockUser = {
        uid: 'mock-google-uid-' + Date.now(),
        email: 'mock@google.com',
        displayName: 'Google User',
        photoURL: ''
      };
      setCurrentUser(mockUser);
      return mockUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out user
  const logout = async () => {
    setError('');
    try {
      localStorage.removeItem('token');
      setCurrentUser(null);
      setIsAdmin(false);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Values to be provided to consumers
  const value = {
    currentUser,
    isLoggedIn: !!currentUser,
    isAdmin,
    userName: currentUser?.name || '',
    userPic: currentUser?.profilePicture || '',
    userEmail: currentUser?.email || '',
    loading,
    error,
    register,
    login,
    googleLogin,
    logout,
    resetPassword,
    refreshUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 