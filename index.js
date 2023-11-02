const { initializeApp }  = require("firebase/app");
const { getFirestore, collection, doc, addDoc }  = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkTx8orZJgcm6yy2gSDmSnFRcspiT2_J8",
    authDomain: "secu1-td1.firebaseapp.com",
    projectId: "secu1-td1",
    storageBucket: "secu1-td1.appspot.com",
    messagingSenderId: "62538946032",
    appId: "1:62538946032:web:ef222d48fcab179eb6b935"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const express = require('express')
const app = express()
const port = 5000
const db = getFirestore(firebaseApp);

app.use(express.json());

const usersCollection = collection(db, 'users'); // 'users' is the name of the collection

app.post('/login', async (req, res) => {
    try {
        const docRef = await addDoc(usersCollection, req.body);
        console.log('Document written with ID: ', docRef.id);
        res.json({ message: 'Document successfully written!', documentId: docRef.id });
    } catch (error) {
        console.error('Error writing document: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})