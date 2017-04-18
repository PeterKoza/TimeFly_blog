import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDsckuKBzZ3FF9Rv8Pz-wCwUCXW6FSBuxM',
  authDomain: 'vuejs-timefly.firebaseapp.com',
  databaseURL: 'https://vuejs-timefly.firebaseio.com',
  projectId: 'vuejs-timefly',
  storageBucket: 'vuejs-timefly.appspot.com',
  messagingSenderId: '549021124622'
}

const app = Firebase.initializeApp(config)
const db = app.database()
const storage = app.storage()

export { db, storage } 