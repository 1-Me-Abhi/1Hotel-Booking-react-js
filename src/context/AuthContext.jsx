import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { saveUserData, checkUserIsAdmin } from '../firebase/userService';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  const checkAdminStatus = async (user) => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    
    const adminStatus = await checkUserIsAdmin(user.uid);
    setIsAdmin(adminStatus);
  };

  // Monitor auth state changes
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? "User logged in" : "No user");
      setCurrentUser(user);
      
      // Check admin status whenever user changes
      if (user) {
        checkAdminStatus(user);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    }, (error) => {
      console.error("Auth state change error:", error);
      setError(error.message);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Register new user
  const register = async (email, password, displayName) => {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
      
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in user
  const login = async (email, password) => {
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with Google
  const googleLogin = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if this is a new user (first time sign-in with Google)
      const isNewUser = result._tokenResponse.isNewUser;
      
      if (isNewUser) {
        // Save user data to Firestore for new Google users
        await saveUserData(result.user.uid, {
          name: result.user.displayName || '',
          email: result.user.email || '',
          phonenum: '',
          address: '',
          pincode: '',
          dob: '',
          // Add Google profile picture if available
          profilePic: result.user.photoURL || ''
        });
      }
      
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out user
  const logout = async () => {
    setError('');
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
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
    userName: currentUser?.displayName || '',
    userPic: currentUser?.photoURL || '',
    userEmail: currentUser?.email || '',
    loading,
    error,
    register,
    login,
    googleLogin,
    logout,
    resetPassword
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