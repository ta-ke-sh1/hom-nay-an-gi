import {addDoc, deleteDoc, doc, Firestore, setDoc, updateDoc, getFirestore, collection, getDocs} from "firebase/firestore"
import {initializeApp} from "firebase/app";
import type {FirestoreTables} from "../enums/enums.ts";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export class DatabaseService {

    private static instance: DatabaseService;

    private readonly database: Firestore;

    private constructor() {
        this.database = getFirestore(app);
    }

    public static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async get(table: FirestoreTables) {
        const docs = await getDocs(collection(this.database, table))
        return docs.docs.map(doc => doc.data());
    }

    public async set(table: FirestoreTables, id: string, data: any) {
        const ref = doc(this.database, table, id)
        await setDoc(ref, data, {merge: true});
    }

    public async update(table: FirestoreTables, id: string, data: any) {
        const ref = doc(this.database, table, id)
        await updateDoc(ref, data, {merge: true});
    }

    public async add(table: FirestoreTables, data: any) {
        console.log(data)
        await addDoc(collection(this.database, table), data)
    }

    public async delete(table: FirestoreTables, id: string) {
        await deleteDoc(doc(this.database, table, id))
    }
}