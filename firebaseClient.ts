
import { initializeApp, getApps } from 'firebase/app'
import { getDatabase } from 'firebase/database'

let firebaseApp: any = null
export function initFirebase() {
  if (getApps().length) return
  const cfg = process.env.NEXT_PUBLIC_FIREBASE_CONFIG_JSON
  if (!cfg) return
  const parsed = JSON.parse(cfg)
  firebaseApp = initializeApp(parsed)
}
export function getRealtimeDB() {
  if (!firebaseApp && getApps().length === 0) initFirebase()
  return getDatabase()
}
