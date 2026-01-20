import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from './config'

// Sign up with email and password
export const signUpWithEmail = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
      createdAt: new Date().toISOString(),
      profileComplete: false
    })
    
    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign in with Google (using popup for better stability)
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    
    if (!userDoc.exists()) {
      // Create user document if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        profileComplete: false
      })
    }
    
    return { success: true, user, isNewUser: !userDoc.exists() }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Handle redirect result after Google Sign-In (kept for compatibility)
export const handleGoogleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth)
    
    if (result && result.user) {
      const user = result.user
      
      // Check if user document exists
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          profileComplete: false
        })
      }
      
      return { success: true, user, isNewUser: !userDoc.exists() }
    }
    
    return { success: false, noResult: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Auth state observer
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}
