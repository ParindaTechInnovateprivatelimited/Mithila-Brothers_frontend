import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const registerWithEmailAndPassword = async (name, email, password, phone, address, pincode) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await user.updateProfile({ displayName: name });
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        return res
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const logout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
