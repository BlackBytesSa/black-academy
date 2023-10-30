import { initializeApp } from 'firebase/app'
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}
const firebaseRegion = import.meta.env.VITE_FIREBASE_REGION

const firebaseApp = initializeApp(firebaseConfig)
const functions = getFunctions(firebaseApp, firebaseRegion)

const connectToEmulators = () => {
  connectFunctionsEmulator(functions, 'localhost', 5001)
}

if (import.meta.env.MODE === 'emulators') connectToEmulators()

export const callFirebaseFunction = async ({
  functionName,
  data,
}: {
  functionName: string
  data: any
}): Promise<{ data: any }> => {
  const firebaseFunction = httpsCallable(functions, functionName)
  const response = await firebaseFunction(data)
  return response
}
