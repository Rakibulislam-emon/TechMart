/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    
    signOut,
    updateProfile,
} from 'firebase/auth'
import toast from 'react-hot-toast';
import { auth } from '../Firebase/firebse.config';


// import axios from 'axios'
// import { auth } from '../Firebase/firebase.config'

// import useAxiosCommon from '../Hooks/useAxiosCommon'

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    // const axiosCommon= useAxiosCommon()
    const [user, setUser] = useState(null)
   
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }
     const logout = () => {
        setLoading(true)
        toast.success('logout successful')
        localStorage.removeItem('token')
        return signOut(auth) 
     }
    // const logOut = async () => {
    //     setLoading(true)
    //     await axios.get(`${''}/logout`, {
    //         withCredentials: true,
    //     })
    //     return signOut(auth)
    // }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }
    
    // Get token from server
    //    const getToken = async email => {
    //     const { data } = await axios.post(
    //       `${import.meta.env.VITE_API_URL}/jwt`,
    //       { email },
    //       { withCredentials: true }
    //     )
    //     return data
    //   }

  // Your useEffect code
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
  });
  return () => unsubscribe();
}, []);
   console.log(user);
    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logout,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider