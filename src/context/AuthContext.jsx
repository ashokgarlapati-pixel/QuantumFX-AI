import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile,
  googleProvider,
  signInWithPopup,
  signInWithRedirect
} from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor Firebase Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 1. User Registration (Sign Up) with Real Email Verification
  const registerUser = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update Display Name
    if (name) {
      await updateProfile(user, { displayName: name });
    }

    // Send real email verification link to prevent fake emails
    try {
      await sendEmailVerification(user);
    } catch (err) {
      console.warn("Email verification dispatch error:", err);
    }

    setCurrentUser({ ...auth.currentUser });
    return user;
  };

  // 2. User Login (Sign In)
  const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  // 3. Google Sign In / Sign Up (Popup with Redirect Fallback)
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
        await signInWithRedirect(auth, googleProvider);
        return null;
      }
      throw err;
    }
  };

  // 4. Resend Verification Email
  const resendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  // 5. Reload User State to check if email was verified
  const reloadUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setCurrentUser({ ...auth.currentUser });
      return auth.currentUser.emailVerified;
    }
    return false;
  };

  // 6. User Logout (Sign Out)
  const logoutUser = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  // 7. Send Password Reset Email
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    resendVerification,
    reloadUser,
    logoutUser,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
