import { db } from './config';
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

/**
 * Saves user data to Firestore after registration
 * @param {string} uid - The user ID from Firebase Auth
 * @param {object} userData - User data from registration form
 */
export const saveUserData = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid);
    
    await setDoc(userRef, {
      name: userData.name || '',
      email: userData.email || '',
      phonenum: userData.phonenum || '',
      address: userData.address || '',
      pincode: userData.pincode || '',
      dob: userData.dob || '',
      isAdmin: userData.isAdmin || false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

/**
 * Gets user data from Firestore
 * @param {string} uid - The user ID from Firebase Auth
 * @returns {object} User data
 */
export const getUserData = async (uid) => {
  if (!uid) {
    console.error("Error: User ID is required to fetch user data");
    throw new Error("User ID is required");
  }
  
  // Check if db is initialized
  if (!db) {
    console.error("Error: Firestore database not initialized");
    throw new Error("Database connection error");
  }
  
  try {
    // Additional timeout for Firestore operations to prevent long hanging requests
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database request timeout")), 10000);
    });
    
    // Actual Firestore operation
    const dbOperation = async () => {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        console.log(`No document found for user ID: ${uid}`);
        return null;
      }
    };
    
    // Race between timeout and db operation
    return await Promise.race([dbOperation(), timeoutPromise]);
  } catch (error) {
    console.error("Error getting user data:", error);
    
    // More specific error message
    if (error.message === "Database request timeout") {
      throw new Error("Connection to database timed out. Please check your internet connection and try again.");
    } else if (error.code === 'permission-denied') {
      throw new Error("You don't have permission to access this data");
    } else if (error.code === 'unavailable' || error.code === 'failed-precondition') {
      throw new Error("Network error: Unable to connect to the database");
    } else if (error.code === 'resource-exhausted') {
      throw new Error("Firebase quota exceeded. Please try again later");
    } else {
      throw new Error(`Database error: ${error.message}`);
    }
  }
};

/**
 * Updates user data in Firestore
 * @param {string} uid - The user ID from Firebase Auth
 * @param {object} userData - Updated user data
 */
export const updateUserData = async (uid, userData) => {
  if (!uid) {
    console.error("Error: User ID is required to update user data");
    throw new Error("User ID is required");
  }
  
  // Check if db is initialized
  if (!db) {
    console.error("Error: Firestore database not initialized");
    throw new Error("Database connection error");
  }
  
  try {
    const userRef = doc(db, "users", uid);
    
    // First check if document exists
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date()
      });
      console.log(`User data updated for ID: ${uid}`);
    } else {
      // Create new document if it doesn't exist
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`New user document created for ID: ${uid}`);
    }
    
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    
    // More specific error messages
    if (error.code === 'permission-denied') {
      throw new Error("You don't have permission to update this data");
    } else if (error.code === 'unavailable' || error.code === 'failed-precondition') {
      throw new Error("Network error: Unable to connect to the database");
    } else if (error.code === 'resource-exhausted') {
      throw new Error("Firebase quota exceeded. Please try again later");
    } else {
      throw new Error(`Database error: ${error.message}`);
    }
  }
};

/**
 * Gets all users from Firestore
 * @returns {Array} Array of user data
 */
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    
    const usersList = [];
    usersSnapshot.forEach((doc) => {
      usersList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return usersList;
  } catch (error) {
    console.error("Error getting all users data:", error);
    throw error;
  }
};

/**
 * Checks if a user has admin privileges
 * @param {string} uid - The user ID from Firebase Auth
 * @returns {boolean} True if user is an admin, false otherwise
 */
export const checkUserIsAdmin = async (uid) => {
  if (!uid) return false;
  
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.isAdmin === true;
    }
    
    return false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}; 