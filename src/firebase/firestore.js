import { doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from './config'

// Save user profile data
export const saveUserProfile = async (userId, profileData) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...profileData,
      profileComplete: true,
      updatedAt: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() }
    }
    return { success: false, error: 'User not found' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Save news bookmark
export const saveNewsBookmark = async (userId, newsData) => {
  try {
    await addDoc(collection(db, 'bookmarks'), {
      userId,
      ...newsData,
      savedAt: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get user bookmarks
export const getUserBookmarks = async (userId) => {
  try {
    const q = query(collection(db, 'bookmarks'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    const bookmarks = []
    querySnapshot.forEach((doc) => {
      bookmarks.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, data: bookmarks }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Save user preferences
export const saveUserPreferences = async (userId, preferences) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      preferences,
      updatedAt: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Save recommended interests (cache LLM result)
export const saveRecommendedInterests = async (userId, interests) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      recommendedInterests: interests,
      interestsUpdatedAt: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get recommended interests from cache
export const getRecommendedInterests = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      const data = userDoc.data()
      return { 
        success: true, 
        data: data.recommendedInterests || null,
        updatedAt: data.interestsUpdatedAt || null
      }
    }
    return { success: false, error: 'User not found' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
