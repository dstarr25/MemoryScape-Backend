import { initializeApp } from 'firebase/app';
import {
    getDatabase, ref, set, get,
} from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCiGRQvLuEtI7cADGSn_Cnt8ruayTBrWr8',
    authDomain: 'memoryscape-be.firebaseapp.com',
    databaseURL: 'https://memoryscape-be-default-rtdb.firebaseio.com',
    projectId: 'memoryscape-be',
    storageBucket: 'memoryscape-be.appspot.com',
    messagingSenderId: '849449312727',
    appId: '1:849449312727:web:e0708200d51aee7e976b92',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const getAuths = (callback) => {
    const authRef = ref(db, '/');
    get(authRef).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            callback(snapshot.val());
        } else {
            console.log('No data available');
        }
    }).catch((error) => {
        console.error(error);
    });
};

export const putAuth = (authType, token) => {
    const authRef = ref(db, `${authType}`);
    set(authRef, {
        token,
    });
};
