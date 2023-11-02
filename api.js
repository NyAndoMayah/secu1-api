// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {doc, getFirestore, setDoc} from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
exports.handler = async (event, context) => {
  // Set headers to enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST",
  };
  if (event.httpMethod === "POST") {
    try {
      // Parse the incoming JSON payload from the request body
      const requestBody = JSON.parse(event.body);
      await setDoc(doc(db, "user"), requestBody.data);
      // Process the data from the request body as needed
      // ...

      // Return a success response
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "POST request processed successfully",
          user: requestBody.data
        }),
      };
    } catch (error) {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Failed to process POST request" }),
      };
    }
  } else {
    // Handle other HTTP methods (e.g., PUT, DELETE) if needed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }
};
